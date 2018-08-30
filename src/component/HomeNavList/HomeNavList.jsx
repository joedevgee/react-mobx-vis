// @flow
import * as React from "react";
import list from "./HomeNavList.content";
import { Card, Row, Col } from "antd";
import styles from "./HomeNavList.css";

const { Meta } = Card;

const HomeNavList = () => {
  const renderCard = (name: string, description: string, image: string) => {
    return (
      <Col
        className={styles.colContainer}
        xs={22}
        sm={22}
        md={10}
        lg={8}
        xl={5}
      >
        <Card hoverable cover={<img alt={name} src={image} />}>
          <Meta title={name} description={description} />
        </Card>
      </Col>
    );
  };
  const renderList = () =>
    list.map(e => renderCard(e.name, e.description, e.image));
  return (
    <Row type="flex" justify="space-around">
      {renderList()}
    </Row>
  );
};

export default HomeNavList;
