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
  const renderWageOccupation = () => {
    if (!detail || !detail.occupation || detail.occupation.length === 0) {
      const payload = {
        show: "geo,soc",
        geo: place.id,
        required: "num_ppl,avg_wage,avg_age",
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
      <section className={styles.incomeWrapper}>
        <MedianIncome
          usIncome={usDetail && usDetail.income ? usDetail.income : []}
          income={detail && detail.income ? detail.income : []}
          displayName={place.display}
          geoId={place.id}
          fetchDetail={fetchDetail}
        />
      </section>
      <section>{renderWageOccupation()}</section>
    </React.Fragment>
  );
};

export default IncomeReport;
