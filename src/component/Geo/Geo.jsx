// @flow
import * as React from "react";
import { observer } from "mobx-react";
import { Route, Switch } from "react-router-dom";
import GeoList from "./GeoList/GeoList";
import GeoDetail from './GeoDetail/GeoDetail.jsx';
import type { Match } from "../../type/RouterType";
import type { GeoStore } from "../../type/GeoType";

type Props = {
  match: Match,
  geoStore: GeoStore
};
const Geo = ({ match, geoStore }: Props) => {
  return (
    <Switch>
      <Route
        exact
        path={match.url}
        render={({ match }) => <GeoList match={match} geoStore={geoStore} />}
      />
      <Route
        path={`${match.url}/:state`}
        render={({ match:Match }) => {
          const state = geoStore.stateList.filter(s => s.urlName === match.params.state)
          return <GeoDetail geo={state} />
        }}
      />
    </Switch>
  );
};

export default observer(Geo);
