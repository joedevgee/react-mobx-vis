// @flow
import * as React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ResponsiveContainer
} from "recharts";
import { Row, Col } from "antd";
import { currencyFormatter } from "../../../../util";
import type { GeoIncome } from "../../../../type/GeoType";

import styles from "./MedianIncome.css";

type Props = {
  usIncome?: GeoIncome,
  income: GeoIncome,
  displayName: string
};

const MedianIncome = ({ usIncome, income, displayName }: Props) => {
  const data = () =>
    income.map(i => {
      const [matchedUsIncome] =
        usIncome && usIncome.length > 0
          ? usIncome.filter(u => u.year === i.year)
          : [{}];
      return { ...i, usIncome: matchedUsIncome.income };
    });

  const renderIncomeIntro = () => {
    const [latestIncome] = income.slice(-1);
    const [latestUsIncome] = usIncome ? usIncome.slice(-1) : [{}];
    if (!latestIncome || !latestUsIncome) {
      return "";
    }
    const formatIncome = usdFormatter(latestIncome.income);
    return (
      <div>
        <header className={styles.titleContainer}>
          <h3 className={styles.titleHeader}>Median Household Income</h3>
          <div className={styles.titleData}>
            <h1 className={styles.titleIncome}>{formatIncome}</h1>
            <div className={styles.titleSub}>
              <p>
                <span className={styles.moeSign}>±</span>
                {usdFormatter(latestIncome.incomeMoe)}
              </p>
              <p>as of {latestIncome.year}</p>
            </div>
          </div>
        </header>
        <p>
          Households in {displayName} have a median annual income of{" "}
          {formatIncome}, which is{" "}
          {latestIncome.income > latestUsIncome.income ? "more" : "less"} than
          the median annual income in the United States. Look at the chart to
          see how the median household income in {displayName} compares to the
          national.
        </p>
      </div>
    );
  };

  const usdFormatter = (value: number): string =>
    `$ ${currencyFormatter(value)}`;

  return (
    <Row type="flex" justify="space-between">
      <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
        {renderIncomeIntro()}
      </Col>
      <Col xs={24} sm={24} md={15} lg={15} xl={15} xxl={15}>
        <div>
          <
        </div>
        <ResponsiveContainer
          className={styles.chartContainer}
          width="100%"
          height="100%"
        >
          <AreaChart data={data()}>
            <defs>
              <linearGradient id="colorUsIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorGeoIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="year" />
            <YAxis
              scale="log"
              domain={["dataMin - 5000", "dataMax + 5000"]}
              tickFormatter={usdFormatter}
            />
            <Tooltip formatter={usdFormatter} />
            <Area
              name="U.S."
              type="monotone"
              dataKey="usIncome"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUsIncome)"
            />
            <Area
              name={`${displayName}`}
              type="monotone"
              dataKey="income"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorGeoIncome)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

MedianIncome.defaultProps = {
  usIncome: []
};

export default MedianIncome;
