// @flow
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { getGeoList, getGeoDetail } from "../../action/GeoAction";
import GeoList from "./GeoList/GeoList";
import GeoDetail from "./GeoDetail/GeoDetail.jsx";
import type { GeoStore } from "../../type/GeoType";
import type { Match } from "../../type/RouterType";

type Props = {
  match: Match,
  store: GeoStore,
  onFetchStates: (limit: number, sumlevel: string) => void,
  onFetchStateDetail: (
    type: string,
    required: Array<string>,
    sumlevel: string | null,
    year: Array<number> | null,
    geo: string
  ) => void
};

type State = {};

export class Geo extends React.Component<Props, State> {
  componentDidMount() {
    console.info("<Geo /> did mount");
    // Fetch list for states
    this.props.onFetchStates(100, "040");
  }

  renderStateList = ({ match }: any) => (
    <GeoList match={match} list={this.props.store.stateList} />
  );
  renderStateDetail = ({ match }: any) => {
    try {
      const selectedState = this.props.store.stateList.filter(
        s => s.urlName === match.params.state
      )[0];
      const selectedDetail = this.props.store.detailList.filter(
        d => d.id === selectedState.id
      )[0];
      return selectedState ? (
        <GeoDetail
          place={selectedState}
          detail={selectedDetail}
          onFetchDetail={this.props.onFetchStateDetail}
        />
      ) : (
        ""
      );
    } catch (err) {
      console.error("Failed to render <GeoDetail />: ", err);
    }
  };

  render() {
    return (
      <React.Fragment>
        <p>Geo</p>
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
      </React.Fragment>
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
    },
    onFetchStateDetail: (type, required, sumlevel, year, geo) => {
      dispatch(getGeoDetail(type, required, sumlevel, year, geo));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Geo);
