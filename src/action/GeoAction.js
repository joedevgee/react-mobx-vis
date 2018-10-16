// @flow

import type { LocationList, GeoDetail } from "../type/GeoType";

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

type GetGeoDetailAction = {
  type: "GET_GEO_DETAIL",
  payload: {
    [string]: string | number
  }
};

type SetGeoDetailAction = {
  type: "SET_GEO_DETAIL",
  payload: {
    id: string,
    detail: GeoDetail
  }
};

type GetGeoAttributeAction = {
  type: "GET_GEO_ATTRIBUTE",
  payload: {
    id: string,
    name: string
  }
};

export type GeoAction =
  | GetGeoListAction
  | SetStateListAction
  | GetGeoDetailAction
  | SetGeoDetailAction
  | GetGeoAttributeAction;

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

export const getGeoDetail = (payload: {
  [string]: string | number
}): GetGeoDetailAction => ({
  type: "GET_GEO_DETAIL",
  payload
});

/**
 * Action to set detail of Geo object (e.g. Income), after API return response
 */
export const setGeoDetail = (
  id: string,
  detail: GeoDetail
): SetGeoDetailAction => ({
  type: "SET_GEO_DETAIL",
  payload: {
    id: id,
    detail: detail
  }
});

/**
 *
 * @param {*} id
 */
export const getGeoAttribute = (
  id: string,
  name: string
): GetGeoAttributeAction => ({
  type: "GET_GEO_ATTRIBUTE",
  payload: {
    id: id,
    name: name
  }
});
