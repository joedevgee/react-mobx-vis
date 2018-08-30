// @flow
import * as React from "react";
import { Layout } from "antd";
import HomeNavList from "../HomeNavList/HomeNavList";
import styles from "./Home.css";

const { Header, Content, Footer } = Layout;

type Props = {
  history: any
};

const Home = (props: Props) => {
  return (
    <React.Fragment>
      <Layout>
        <Header>
          <div className={styles.logo} />
        </Header>
        <Content className={styles.content}>
          <div className={styles.contentContainer}>
            <HomeNavList />
          </div>
        </Content>
        <Footer className={styles.footer}>Developed by Joey</Footer>
      </Layout>
    </React.Fragment>
  );
};

export default Home;
