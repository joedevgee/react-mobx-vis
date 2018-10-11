// @flow
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import {
  getGeoList,
  getGeoDetail,
  getGeoAttribute
} from "../../action/GeoAction";
import GeoList from "./GeoList/GeoList";
import { GeoConstant } from "../../constant";
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
  ) => void,
  onFetchGeoAttr: (id: string) => void
};

type State = {};

export class Geo extends React.Component<Props, State> {
  componentDidMount() {
    // Fetch list for states
    this.props.onFetchStates(100, GeoConstant.GEO_STATE_CATEGORY);
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
      const usDetail = this.props.store.detailList.filter(
        d => d.id === GeoConstant.US_GEO
      )[0];
      return selectedState ? (
        <GeoDetail
          place={selectedState}
          detail={selectedDetail}
          usDetail={usDetail}
          onFetchDetail={this.props.onFetchStateDetail}
          onFetchAttribute={this.props.onFetchGeoAttr}
        />
      ) : (
        ""
      );
    } catch (err) {
      return "Loading";
    }
  };

  render() {
    return (
      <React.Fragment>
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

const mapStateToProps = (state: { geoStore: GeoStore }) => {
  return {
    store: state.geoStore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchStates: (limit: number, sumlevel: string) => {
      dispatch(getGeoList(limit, sumlevel));
    },
    onFetchStateDetail: (
      type: "income",
      required: Array<string>,
      sumlevel: string,
      year: Array<number> | null,
      geo: string
    ) => {
      dispatch(getGeoDetail(type, required, sumlevel, year, geo));
    },
    onFetchGeoAttr: (id: string, name: string) => {
      dispatch(getGeoAttribute(id, name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Geo);
