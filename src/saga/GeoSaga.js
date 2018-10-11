import { call, put, takeLatest, all } from "redux-saga/effects";

import GeoApi from "../api/GeoApi";
import UnsplashApi from "../api/UnSplashApi";
import { GeoConstant } from "../constant";

function* fetchGeoList(action) {
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

function* fetchGeoDetail(action) {
  try {
    const geoDetail = yield call(GeoApi.getGeoDetail, action.payload);
    /**
     * For comparison purpose
     * Also fetch same detail for U.S. as a whole
     */
    const usPayload = { ...action.payload, geo: GeoConstant.US_GEO };
    const usGeoDetail: GeoDetail = yield call(GeoApi.getGeoDetail, usPayload);
    yield all([
      put({
        type: "SET_GEO_DETAIL",
        payload: {
          id: action.payload.geo,
          ...geoDetail
        }
      }),
      put({
        type: "SET_GEO_DETAIL",
        payload: {
          id: usPayload.geo,
          ...usGeoDetail
        }
      })
    ]);
  } catch (err) {
    console.error(err);
  }
}

function* fetchGeoAttribute(action) {
  try {
    // const geoAttr = yield call(GeoApi.getGeoAttribute, action.payload);
    const images = yield call(UnsplashApi.getRandomPhoto, action.payload.name);
    yield put({
      type: "SET_GEO_DETAIL",
      payload: {
        id: action.payload.id,
        attribute: images
      }
    });
  } catch (err) {
    console.error(err);
  }
}

export function* geoSaga() {
  yield takeLatest("GET_GEO_LIST", fetchGeoList);
  yield takeLatest("GET_GEO_DETAIL", fetchGeoDetail);
  yield takeLatest("GET_GEO_ATTRIBUTE", fetchGeoAttribute);
}
