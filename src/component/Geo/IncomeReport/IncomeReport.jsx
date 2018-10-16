// @flow
import * as React from "react";
import type {
  GeoDetail as GeoDetailType,
  State as StateType
} from "../../../type/GeoType";
import MedianIncome from "./MedianIncome/MedianIncome";
import Occupation from "./Occupation/Occupation";
import styles from "./IncomeReport.css";

type Props = {
  detail: GeoDetailType,
  usDetail: GeoDetailType,
  place: StateType,
  fetchDetail: (payload: { [string]: string | number }) => void
};

const IncomeReport = ({ detail, usDetail, place, fetchDetail }: Props) => {
  const renderMedianIncome = () => {
    if (!detail || !detail.income || detail.income.length === 0) {
      const payload = {
        show: "geo",
        geo: place.id,
        required: "income,income_moe",
        year: "all",
        type: "income"
      };
      fetchDetail(payload);
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

  const renderWageOccupation = () => {
    if (!detail || !detail.occupation || detail.occupation.length === 0) {
      const payload = {
        show: "geo,soc",
        geo: place.id,
        required: "num_ppl,num_ppl_moe,avg_wage,avg_wage_moe",
        year: "2016",
        limit: "5",
        sort: "desc",
        where: "num_records:>4",
        order: "avg_wage",
        type: "occupation"
      };
      fetchDetail(payload);
    } else {
      return <Occupation occupation={detail.occupation} name={place.display} />;
    }
  };

  return (
    <React.Fragment>
      <section className={styles.incomeWrapper}>{renderMedianIncome()}</section>
      <section>{renderWageOccupation()}</section>
    </React.Fragment>
  );
};

export default IncomeReport;
