// @flow
import * as React from "react";
import { Row, Col } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  ResponsiveContainer
} from "recharts";
import { currencyFormatter } from "../../../../util";
import type { GeoOccupation } from "../../../../type/GeoType";

import styles from "./Occupation.css";

type Props = {
  occupation: GeoOccupation,
  name: string
};

const Occupation = ({ occupation, name }: Props) => {
  const usdFormatter = (value: number): string =>
    `$${currencyFormatter(value)}`;

  const xTickFormat = (v: number): string => {
    return `$${currencyFormatter(v / 1000)}K`;
  };

  const renderOccupationIntro = () => {
    return (
      <div>
        <h2>Income by Occupations</h2>
      </div>
    );
  };

  const renderCustomLabel = (labelProps: {
    x: number,
    y: number,
    width: number,
    height: number,
    value: string
  }) => {
    const { x, y, width, height, value } = labelProps;
    return (
      <text
        textAnchor="start"
        fill="#C6C7CA"
        dx="5%"
        x={x + width}
        y={y + height / 2}
        className={styles.labelText}
      >
        {value}
      </text>
    );
  };

  return (
    <Row
      className={styles.occupationContainer}
      type="flex"
      justify="space-between"
    >
      <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
        {renderOccupationIntro()}
      </Col>
      <Col xs={24} sm={24} md={13} lg={13} xl={13} xxl={13}>
        <ResponsiveContainer
          className={styles.chartContainer}
          width="100%"
          height="100%"
        >
          <BarChart layout="vertical" data={occupation}>
            <XAxis
              type="number"
              domain={[80000, 300000]}
              tickFormatter={xTickFormat}
            />
            <YAxis hide={true} type="category" dataKey="name" />
            <Tooltip formatter={usdFormatter} />
            <Bar name="Avgerage Wage" dataKey="avgWage" fill="#ef6145">
              <LabelList dataKey="name" content={renderCustomLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

export default Occupation;
