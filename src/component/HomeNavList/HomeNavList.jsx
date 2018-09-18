// @flow
import * as React from "react";
import list from "./HomeNavList.content";
import { Card, Row, Col } from "antd";
import styles from "./HomeNavList.css";

type Props = {
  history: any
};

const HomeNavList = ({ history }: Props) => {
  const renderCard = (
    name: string,
    path: string,
    description: string,
    image: string
  ) => {
    const clickHandler = () => {
      history.push(path);
    };
    return (
      <Col
        key={path}
        className={styles.colContainer}
        xs={22}
        sm={22}
        md={10}
        lg={8}
        xl={5}
      >
        <Card onClick={clickHandler} cover={<img alt={name} src={image} />}>
          <Card.Meta title={name} description={description} />
        </Card>
      </Col>
    );
  };
  const renderList = () =>
    list.map(e => renderCard(e.name, e.path, e.description, e.image));
  return (
    <Row type="flex" justify="space-around">
      {renderList()}
    </Row>
  );
};

export default HomeNavList;
