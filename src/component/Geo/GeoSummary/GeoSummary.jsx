// @flow
import * as React from "react";
import { currencyFormatter } from "../../../util";
import type { GeoDetail, State } from "../../../type/GeoType";

import styles from "./GeoSummary.css";

type Props = {
  geo: State,
  detail: GeoDetail
};

const GeoSummary = ({ geo, detail }: Props) => {
  const summaryItem = (title: string, data: string) => (
    <div className={styles.summaryItem}>
      <span>{title}</span>
      <span>{data}</span>
    </div>
  );

  const renderIncomeSummary = () => {
    let incomeNum = 0;

    try {
      const [latestData] = detail.income.slice(-1);
      incomeNum = latestData.income;
    } catch (err) {
      console.error(err);
    }
    return summaryItem(
      "Median Household Income",
      `$ ${currencyFormatter(incomeNum)}`
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${
          detail.attribute ? detail.attribute.fullImageLink : ""
        })`
      }}
      className={styles.summaryContainer}
    >
      <div className={styles.headerTitle}>
        <h1>{geo.display}</h1>
      </div>
      <div className={styles.summaryItemContainer}>
        {detail.income && renderIncomeSummary()}
      </div>
    </div>
  );
};

export default GeoSummary;
