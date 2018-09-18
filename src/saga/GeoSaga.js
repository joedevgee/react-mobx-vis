// @flow
import { call, put, takeLatest } from "redux-saga/effects";
import type { Saga } from "redux-saga";

import GeoApi from "../api/GeoApi";
import type { GeoAction } from "../action/GeoAction";

function* fetchGeoList(action: GeoAction): Saga<void> {
  try {
    const stateList = yield call(GeoApi.getStates, action.payload);
    yield put({
      type: "SET_STATE_LIST",
      payload: {
        stateList: stateList
      }
    });
  } catch (err) {
    console.error(err);
  }
}

function* fetchGeoDetail(action: GeoAction): Saga<void> {
  try {
    const geoDetail = yield call(GeoApi.getGeoDetail, action.payload);
    yield put({
      type: "SET_GEO_DETAIL",
      payload: {
        id: action.payload.geo,
        detail: geoDetail
      }
    });
  } catch (err) {
    console.error(err);
  }
}

export function* geoSaga(): Saga<void> {
  yield takeLatest("GET_GEO_LIST", fetchGeoList);
  yield takeLatest("GET_GEO_DETAIL", fetchGeoDetail);
}
