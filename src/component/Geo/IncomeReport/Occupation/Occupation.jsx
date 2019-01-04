// @flow
import * as React from "react";
import { Row, Col } from "antd";
import OccupationChart from "./OccupationChart";
import type { GeoOccupation } from "../../../../type/GeoType";

import styles from "./Occupation.css";

type Props = {
  occupation: GeoOccupation,
  name: string
};

const Occupation = ({ occupation, name }: Props) => {
  const renderOccupationIntro = () => {
    return (
      <div>
        <h2>Income by Occupations</h2>
      </div>
    );
  };

  return (
    <Row
      className={styles.occupationContainer}
      type="flex"
      justify="space-between"
    >
      <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
        {renderOccupationIntro()}
      </Col>
      <Col xs={24} sm={24} md={13} lg={13} xl={13} xxl={13}>
        <OccupationChart geoName={name} occupation={occupation} />
      </Col>
    </Row>
  );
};

export default Occupation;
