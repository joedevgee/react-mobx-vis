// @flow
import * as React from "react";
import { Chart, Coord, Axis, Tooltip, Geom } from "bizcharts";
import { Table, Tooltip as AntdTooltip } from "antd";
import DataOptions from "../../../DataOptions/DataOptions";
import type { GeoOccupation } from "../../../../type/GeoType";
import { currencyFormatter } from "../../../../util";

type Props = {
  occupation: GeoOccupation,
  geoName: string
};

type State = {
  chartInstance: any
};

// const OccupationChart = ({ occupation, geoName }: Props) => {
class OccupationChart extends React.Component<Props, State> {
  state = {
    chartInstance: {}
  };
  label = () => ({
    textStyle: {
      textAlign: "start",
      fontSize: "12"
    },
    offset: -20
  });
  cols = () => ({
    avgWage: {
      min: 80000,
      alias: "Avg Wage",
      tickInterval: 50000,
      formatter: v => `$${currencyFormatter(v / 1000)}K`
    }
  });
  dataSourceTable = () => {
    const columns = [
      {
        title: "Occupation",
        dataIndex: "name",
        render: o => {
          // Use space between to determine the length
          const spaceCount = o.split(" ").length - 1;
          return spaceCount <= 2 ? (
            o
          ) : (
            <AntdTooltip title={o}>
              <span>
                {o.slice(0, 15)}
                ...
              </span>
            </AntdTooltip>
          );
        }
      },
      {
        title: "Avg. Wage",
        dataIndex: "avgWage",
        render: v => `$${currencyFormatter(Math.round(v / 1000))}K`,
        sorter: (a, b) => a.avgWage - b.avgWage
      },
      {
        title: "Avg. Age",
        dataIndex: "avgAge",
        render: v => Math.round(v),
        sorter: (a, b) => a.avgAge - b.avgAge
      },
      {
        title: "# of people",
        dataIndex: "numPpl",
        render: v => currencyFormatter(v),
        sorter: (a, b) => a.numPpl - b.numPpl
      }
    ];
    return (
      <Table
        rowKey="soc"
        size="small"
        pagination={false}
        dataSource={this.props.occupation}
        columns={columns}
      />
    );
  };
  render() {
    return (
      <React.Fragment>
        <Chart
          renderer="svg"
          padding={[20, 20, 30, 20]}
          scale={this.cols()}
          height={400}
          data={[...this.props.occupation].reverse()} // Do not mutate the source data
          forceFit
          onGetG2Instance={chartIns =>
            this.setState({ chartInstance: chartIns })
          }
        >
          <DataOptions
            chartInstance={this.state.chartInstance}
            title={`${this.props.geoName} top paying occupations`}
            dataTable={this.dataSourceTable()}
          />
          <Coord transpose />
          <Axis name="name" label={this.label()} />
          <Axis name="avgWage" />
          <Tooltip />
          <Geom
            type="interval"
            position="name*avgWage"
            color={"name"}
            tooltip={[
              "name*avgWage",
              (name, avgWage) => ({
                name: "Average Wage",
                title: name,
                value: `$ ${currencyFormatter(avgWage)}`
              })
            ]}
          />
        </Chart>
      </React.Fragment>
    );
  }
}

export default OccupationChart;
