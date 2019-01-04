// @flow
import * as React from "react";
import { Row, Col, Table } from "antd";
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import DataOptions from "../../../DataOptions/DataOptions";
import { currencyFormatter } from "../../../../util";
import { GeoConstant } from "../../../../constant";
import type { GeoIncome } from "../../../../type/GeoType";

import styles from "./MedianIncome.css";

type Props = {
  usIncome: GeoIncome,
  income: GeoIncome,
  displayName: string,
  geoId: string,
  fetchDetail: (payload: { [string]: string | number }) => void
};

type State = {
  chartInstance: any
};

class MedianIncome extends React.Component<Props, State> {
  state = {
    chartInstance: {}
  };
  componentDidMount() {
    const { usIncome, income, geoId, fetchDetail } = this.props;
    if (usIncome.length === 0 || income.length === 0) {
      const payload = {
        show: "geo",
        geo: geoId,
        required: "income,income_moe",
        year: "all",
        type: "income"
      };
      fetchDetail(payload);
    }
  }
  renderIncomeIntro = () => {
    const { usIncome, income, displayName } = this.props;
    const [latestIncome] = income.slice(-1);
    const [latestUsIncome] = usIncome ? usIncome.slice(-1) : [{}];
    const formatIncome = this.usdFormatter(
      latestIncome ? latestIncome.income : 0
    );
    return (
      <div>
        <header className={styles.titleContainer}>
          <h3 className={styles.titleHeader}>Median Household Income</h3>
          <div className={styles.titleData}>
            <h1 className={styles.titleIncome}>{formatIncome}</h1>
            <div className={styles.titleSub}>
              <p>
                <span className={styles.moeSign}>±</span>
                {this.usdFormatter(latestIncome ? latestIncome.incomeMoe : 0)}
              </p>
              <p>as of {latestIncome ? latestIncome.year : 0}</p>
            </div>
          </div>
        </header>
        <p>
          Households in {displayName} have a median annual income of{" "}
          {formatIncome}, which is{" "}
          {latestIncome &&
          latestUsIncome &&
          latestIncome.income > latestUsIncome.income
            ? "more"
            : "less"}{" "}
          than the median annual income in the United States. Look at the chart
          to see how the median household income in {displayName} compares to
          the national.
        </p>
      </div>
    );
  };

  renderDataTable = () => {
    const { usIncome, income, displayName } = this.props;
    const dataSource = income.map(t => ({
      ...t,
      usIncome: (usIncome.filter(k => k.year === t.year)[0] || {}).income
    }));
    const sorter = (a: { year: number }, b: { year: number }) =>
      a.year - b.year;
    const columns = [
      {
        title: "Year",
        dataIndex: "year",
        sorter: sorter
      },
      {
        title: displayName,
        dataIndex: "income",
        render: this.usdFormatter
      },
      {
        title: "National",
        dataIndex: "usIncome",
        render: this.usdFormatter
      }
    ];
    return (
      <Table
        rowKey="year"
        pagination={false}
        dataSource={dataSource}
        columns={columns}
      />
    );
  };

  renderIncomeChart = () => {
    const { usIncome, income, displayName } = this.props;
    const sourceData = [...income, ...usIncome].map(d => ({
      ...d,
      geo: d.geo === GeoConstant.US_GEO ? "National" : displayName
    }));
    const cols = {
      year: {
        alias: `${displayName} median household income`,
        type: "linear",
        tickInterval: 1
      },
      income: {
        alias: "Median Income",
        formatter: this.usdFormatter
      }
    };
    const axisLine = {
      stroke: "#CCC",
      fill: "#FFF",
      lineWidth: 1
    };
    const axisLabel = {
      textStyle: {
        textAlign: "end",
        fontSize: "8"
      }
    };
    return (
      <Chart
        renderer="svg"
        data={sourceData}
        scale={cols}
        height={400}
        forceFit
        onGetG2Instance={chartIns => this.setState({ chartInstance: chartIns })}
      >
        <DataOptions
          chartInstance={this.state.chartInstance}
          title={`${displayName} median household income`}
          dataTable={this.renderDataTable()}
        />
        <Axis name="year" line={axisLine} title="Median household income" />
        <Axis name="income" line={axisLine} label={axisLabel} />
        <Legend />
        <Tooltip
          crosshairs={{
            type: "cross"
          }}
        />
        <Geom type="area" position="year*income" color="geo" />
        <Geom type="line" position="year*income" size={1} color="geo" />
      </Chart>
    );
  };

  usdFormatter = (value: number): string => `$ ${currencyFormatter(value)}`;

  render() {
    return (
      <Row type="flex" justify="space-between">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
          {this.renderIncomeIntro()}
        </Col>
        <Col xs={24} sm={24} md={15} lg={15} xl={15} xxl={15}>
          {this.renderIncomeChart()}
        </Col>
      </Row>
    );
  }
}

export default MedianIncome;
