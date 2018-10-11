// @flow
import * as React from "react";
import { Icon } from "antd";
import { Link } from "react-router-dom";
import type { Match } from "../../../type/RouterType";
import type { State, LocationList } from "../../../type/GeoType";

import styles from "./GeoList.css";

type Props = {
  match: Match,
  list: LocationList
};

const GeoList = ({ match, list }: Props) => {
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
      <li key={location.urlName}>
        <Link
          to={`${match.url}/${location.urlName}`}
          className={styles.listInnerWrapper}
        >
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
      {list.map(el => renderGeoItem(el))}
    </ul>
  );
};

export default GeoList;
