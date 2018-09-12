// @flow
import * as React from "react";
import { Icon } from "antd";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import type { Match } from "../../../type/RouterType";
import type { State, GeoStore } from "../../../type/GeoType";

import styles from "./GeoList.css";

type Props = {
  match: Match,
  geoStore: GeoStore
};

const GeoList = ({ match, geoStore }: Props) => {
  const geoCategory = (level: string) => {
    let category = "";
    switch (level) {
      case "040":
        category = "STATE";
        break;
      default:
        category = "";
    }
    return category;
  };
  const renderGeoItem = (location: State) => {
    return (
      <li key={location.urlName} className={styles.listInnerWrapper}>
        <Link to={`${match.url}/${location.urlName}`}>
          <span className={styles.iconWrapper}>
            <Icon type="environment" theme="outlined" />
          </span>
          <div className={styles.titleWrapper}>
            <p className={styles.listTitle}>{location.display}</p>
            <p className={styles.listSubtitle}>
              {geoCategory(location.sumLevel)}
            </p>
          </div>
        </Link>
      </li>
    );
  };
  return (
    <ul className={styles.listContainer}>
      {geoStore.stateList.map(el => renderGeoItem(el))}
    </ul>
  );
};

export default observer(GeoList);
