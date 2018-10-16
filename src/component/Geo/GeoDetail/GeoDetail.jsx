// @flow
import * as React from "react";
import GeoSummary from "../GeoSummary/GeoSummary";
import IncomeReport from "../IncomeReport/IncomeReport";

import type {
  GeoDetail as GeoDetailType,
  State as StateType
} from "../../../type/GeoType";

import styles from "./GeoDetail.css";

type Props = {
  place: StateType,
  detail: GeoDetailType,
  usDetail: GeoDetailType,
  onFetchDetail: () => {},
  onFetchAttribute: (id: string, name: string) => void
};

type State = {};

class GeoDetail extends React.Component<Props, State> {
  componentDidMount() {
    this.fetchAttr();
  }

  fetchAttr = () => {
    this.props.onFetchAttribute(this.props.place.id, this.props.place.display);
  };

  renderSummary = () => {
    const { detail, place } = this.props;
    return detail ? <GeoSummary geo={place} detail={detail} /> : "";
  };

  renderEconomySection = () => {
    const { usDetail, detail, place, onFetchDetail } = this.props;
    return (
      <article className={styles.economySection}>
        <h1 className={styles.economyTitle}>Economy</h1>
        {
          <IncomeReport
            detail={detail}
            usDetail={usDetail}
            place={place}
            fetchDetail={onFetchDetail}
          />
        }
      </article>
    );
  };

  render() {
    return (
      <div className={styles.detailContainer}>
        {this.renderSummary()}
        {this.renderEconomySection()}
      </div>
    );
  }
}

export default GeoDetail;
