// @flow

export type GeoResponse = {
  data: Array<Array<string>>,
  headers: Array<string>
};

export type GeoIncome = Array<{
  year: number,
  geo: string,
  income: number,
  incomeMoe: number
}>;

export type GeoAttribute = {
  id: string,
  fullName: string,
  rawImageLink: string,
  fullImageLink: string,
  regularImageLink: string,
  smallImageLink: string,
  thumbImageLink: string,
  imageDescription: string,
  imageAuthorProfileLink: string,
  imageAuthor: string
};

export type GeoDetail = {
  id: string,
  income?: GeoIncome,
  attribute?: GeoAttribute
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
  stateList: LocationList,
  detailList: Array<GeoDetail>
};
