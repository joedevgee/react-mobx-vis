// @flow

export type GeoResponse = {
  data: Array<Array<string>>,
  headers: Array<string>
};

export type State = {
  id: string,
  name: string,
  zValue: number,
  kind: string,
  display: string,
  sumLevel: string,
  isStem: -1 | 1 | 0,
  urlName: string
};

export type LocationList = Array<State>;

export type GeoStore = {
  stateList: LocationList
};
