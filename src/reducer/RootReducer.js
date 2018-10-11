import { combineReducers } from "redux";
import GeoReducer from "./GeoReducer";

const rootReducer = combineReducers({
  geoStore: GeoReducer
});

export default rootReducer;
