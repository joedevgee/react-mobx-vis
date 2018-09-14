// @flow
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { getGeoList } from "../../action/GeoAction";
import GeoList from "./GeoList/GeoList";
import GeoDetail from "./GeoDetail/GeoDetail.jsx";
import type { LocationList } from "../../type/GeoType";
import type { Match } from "../../type/RouterType";

type Props = {
  match: Match,
  store: {
    stateList: LocationList
  },
  onFetchStates: (limit: number, sumlevel: string) => void
};

type State = {};

class Geo extends React.Component<Props, State> {
  componentDidMount() {
    // Fetch list for states
    this.props.onFetchStates(100, "040");
  }

  renderStateList = ({ match }) => (
    <GeoList match={match} list={this.props.store.stateList} />
  );

  renderStateDetail = ({ match }) => {
    const detailState = this.props.store.stateList.filter(
      s => s.urlName === match.params.state
    );
    return detailState.length > 0 ? <GeoDetail geo={detailState[0]} /> : null;
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path={this.props.match.url}
          component={this.renderStateList}
        />
        <Route
          path={`${this.props.match.url}/:state`}
          component={this.renderStateDetail}
        />
      </Switch>
    );
  }
}

const mapStateToProps = ({ GeoStore }) => {
  return {
    store: GeoStore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchStates: (limit, sumlevel) => {
      dispatch(getGeoList(limit, sumlevel));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Geo);
