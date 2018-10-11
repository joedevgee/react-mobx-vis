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
    type: "income",
    required: Array<string>,
    sumlevel: string,
    year: Array<number> | null,
    geo: string
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

/**
 * Action to fetch detail of a specific geo location. e.g. California, New York
 * @param {[string]} required [A list of params to include in the response]
 * @param {string} sumlevel [e.g. "040" = State level]
 * @param {[number]} year [e.g. [2011, 2012, 2013]. P.S. default is All]
 * @param {string} geo [ID for the location, e.g. California = 04000US06]
 */
export const getGeoDetail = (
  type: "income",
  required: Array<string>,
  sumlevel: string,
  year: Array<number> | null,
  geo: string
): GetGeoDetailAction => ({
  type: "GET_GEO_DETAIL",
  payload: {
    type: type,
    required: required,
    sumlevel: sumlevel,
    year: year,
    geo: geo
  }
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
