// @flow

import type { LocationList } from "../type/GeoType";

type GetGeoListAction = {
  type: "GET_GEO_LIST",
  payload: {
    limit: number,
    sumlevel: string
  }
};

type SetStateListAction = {
  type: "SET_STATE_LIST",
  payload: {
    stateList: LocationList
  }
};

export type GeoAction = GetGeoListAction | SetStateListAction;

/**
 * Action to fetch a list of Geo locations. e.g. States, Metros
 * @param {number} limit [Limit the number of return results]
 * @param {string} sumlevel [e.g. "040" = State Level]
 */
export const getGeoList = (
  limit: number,
  sumlevel: string
): GetGeoListAction => ({
  type: "GET_GEO_LIST",
  payload: {
    limit: limit,
    sumlevel: sumlevel
  }
});

export const setStateList = (stateList: LocationList): SetStateListAction => ({
  type: "SET_STATE_LIST",
  payload: {
    stateList: stateList
  }
});
