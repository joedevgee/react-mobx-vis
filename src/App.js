import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Home from "./component/Home/Home";
import CityList from "./component/CityList/CityList";

import "./App.css";
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={withRouter(Home)} />
          <Route path="/city" component={CityList} />
        </Switch>
      </Router>
    );
  }
}

export default App;
