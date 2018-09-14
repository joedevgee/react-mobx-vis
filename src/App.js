// @flow
import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { Layout, Icon } from "antd";
import HomeNavList from "./component/HomeNavList/HomeNavList";
import Geo from "./component/Geo/Geo";

import styles from "./App.css";

const { Header, Content, Sider } = Layout;
type Props = {};
type State = {
  collapsed: boolean
};

class App extends React.Component<Props, State> {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <React.Fragment>
        <Layout className={styles.layout}>
          <Sider
            className={styles.sider}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className={styles.logo} />
          </Sider>
          <Layout className={styles.layout}>
            <Header className={styles.header}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                onClick={this.toggle}
              />
            </Header>
            <Content className={styles.content}>
              <Router>
                <Switch>
                  <Route exact path="/" component={withRouter(HomeNavList)} />
                  <Route path="/geo" component={Geo} />
                </Switch>
              </Router>
            </Content>
          </Layout>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
