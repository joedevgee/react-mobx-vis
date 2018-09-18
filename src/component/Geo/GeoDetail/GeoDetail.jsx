// @flow
import * as React from "react";
import IncomeReport from "../IncomeReport/IncomeReport";

import type { GeoDetail as GeoDetailType, State } from "../../../type/GeoType";

type Props = {
  place: State,
  detail?: GeoDetailType,
  onFetchDetail: (
    type: string,
    required: Array<string>,
    sumlevel: string | null,
    year: Array<number> | null,
    geo: string
  ) => void
};

const GeoDetail = ({ place, detail, onFetchDetail }: Props) => {
  const incomeVisual = () => {
    const required = ["income", "income_moe"];
    if (detail.income) {
      return <IncomeReport income={detail.income} />;
    } else {
      onFetchDetail("income", required, null, null, place.id);
    }
  };
  return (
    <React.Fragment>
      {place && place.display && <h1>{place.display}</h1>}
      {incomeVisual()}
    </React.Fragment>
  );
};

GeoDetail.defaultProps = {
  detail: {}
};

export default GeoDetail;
