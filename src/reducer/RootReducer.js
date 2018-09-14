import { combineReducers } from "redux";
import GeoReducer from "./GeoReducer";

const rootReducer = combineReducers({
  GeoStore: GeoReducer
});

export default rootReducer;
