import { fork } from "redux-saga/effects";
import { geoSaga } from "./GeoSaga";

export default function* rootSage() {
  yield* [fork(geoSaga)];
}
