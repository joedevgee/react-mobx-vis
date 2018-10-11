// @flow
import * as React from "react";
import type {
  GeoDetail as GeoDetailType,
  State as StateType
} from "../../../type/GeoType";
import MedianIncome from "./MedianIncome/MedianIncome";
import styles from "./IncomeReport.css";

type Props = {
  detail: GeoDetailType,
  usDetail: GeoDetailType,
  place: StateType,
  fetchDetail: (
    type: string,
    required: Array<string>,
    sumlevel: string | null,
    year: Array<number> | null,
    geo: string
  ) => void
};

const IncomeReport = ({ detail, usDetail, place, fetchDetail }: Props) => {
  const renderMedianIncome = () => {
    if (!detail || !detail.income || detail.income.length === 0) {
      const required = ["income", "income_moe"];
      fetchDetail("income", required, null, null, place.id);
    } else {
      return (
        <MedianIncome
          usIncome={usDetail.income}
          income={detail.income}
          displayName={place.display}
        />
      );
    }
  };

  return (
    <section className={styles.incomeWrapper}>{renderMedianIncome()}</section>
  );
};

export default IncomeReport;
