// @flow
import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import { Layout } from "antd";
import ScreenContext from "./component/Context/ScreenContext";
import HomeNavList from "./component/HomeNavList/HomeNavList";
import * as BizCharts from "bizcharts";
import Geo from "./component/Geo/Geo";
import styles from "./App.css";

BizCharts.track(false); //Disable track for ali

type Props = {};
type State = {
  isSmallScreen: boolean
};
class App extends React.Component<Props, State> {
  state = {
    isSmallScreen: false
  };
  changeBreakpoint = (isSmallScreen: boolean) => {
    this.setState({
      isSmallScreen
    });
  };
  render() {
    return (
      <ScreenContext.Provider value={this.state.isSmallScreen}>
        <Layout className={styles.layout}>
          <Layout.Sider
            className={styles.sider}
            breakpoint="sm"
            collapsedWidth="0"
            onBreakpoint={this.changeBreakpoint}
          >
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
      </ScreenContext.Provider>
    );
  }
}

export default App;
