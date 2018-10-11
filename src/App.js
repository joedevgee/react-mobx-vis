// @flow
import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { Layout } from "antd";
import HomeNavList from "./component/HomeNavList/HomeNavList";
import Geo from "./component/Geo/Geo";

import styles from "./App.css";

const App = () => (
  <React.Fragment>
    <Layout className={styles.layout}>
      <Layout.Sider className={styles.sider} breakpoint="lg" collapsedWidth="0">
        <div className={styles.logo} />
      </Layout.Sider>
      <Layout className={styles.layout}>
        <Layout.Content className={styles.content}>
          <Router>
            <Switch>
              <Route exact path="/" component={withRouter(HomeNavList)} />
              <Route path="/geo" component={Geo} />
            </Switch>
          </Router>
        </Layout.Content>
      </Layout>
    </Layout>
  </React.Fragment>
);

export default App;
