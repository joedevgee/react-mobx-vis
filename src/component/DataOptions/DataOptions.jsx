// @flow
import * as React from "react";
import { Button, Modal, Row, Col } from "antd";
import ScreenContext from "../Context/ScreenContext";

import styles from "./DataOptions.css";

type Props = {
  dataTable: React.Node,
  title: string,
  chartInstance: any
};

type State = {
  isModalOpen: boolean
};

class DataOptions extends React.Component<Props, State> {
  static defaultProps = {
    downloadImage: () => {}
  };

  state = {
    isModalOpen: false
  };

  openModal = () => {
    this.setState({
      isModalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  handleDownload = () => {
    console.log(this.props.chartInstance);
    this.props.chartInstance.downloadImage();
  };

  smallButtons = () => (
    <React.Fragment>
      <Button.Group>
        <Button ghost shape="circle" icon="search" onClick={this.openModal} />
        <Button
          shape="circle"
          ghost
          icon="download"
          onClick={this.handleDownload}
        />
      </Button.Group>
    </React.Fragment>
  );

  largeButtons = () => (
    <Button.Group className={styles.largeBtnGroup}>
      <Button size="small" ghost icon="search" onClick={this.openModal}>
        Data Source
      </Button>
      <Button size="small" ghost icon="download" onClick={this.handleDownload}>
        Save Image
      </Button>
    </Button.Group>
  );

  render() {
    return (
      <ScreenContext.Consumer>
        {isSmallScreen => (
          <React.Fragment>
            <Row type="flex" justify="end">
              <Col xs={5} sm={5} md={20} lg={20} xl={20} xxl={20}>
                {isSmallScreen ? this.smallButtons() : this.largeButtons()}
              </Col>
            </Row>
            <Modal
              title={this.props.title}
              bodyStyle={{ padding: "0" }}
              visible={this.state.isModalOpen}
              footer={null}
              onCancel={this.closeModal}
            >
              {this.props.dataTable}
            </Modal>
          </React.Fragment>
        )}
      </ScreenContext.Consumer>
    );
  }
}

export default DataOptions;
