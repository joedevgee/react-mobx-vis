// @flow
import * as React from "react";
import { LineChart, Line, XAxis } from "recharts";
import type { GeoIncome } from "../../../type/GeoType";

type Props = {
  income: GeoIncome
};

const IncomeReport = ({ income }: Props) => {
  return (
    <LineChart data={income} width={400} height={400}>
      <XAxis dataKey="year" />
      <Line type="monotone" dataKey="income" stroke="#ff7300" />
    </LineChart>
  );
};

export default IncomeReport;
