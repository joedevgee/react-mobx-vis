// @flow
import type { GeoAction } from "../action/GeoAction";
import type { LocationList } from "../type/GeoType";

export type GeoState = {
  +stateList: LocationList
};

const geoReducer = (
  state: GeoState = { stateList: [] },
  action: GeoAction
): GeoState => {
  switch (action.type) {
    case "SET_STATE_LIST":
      return {
        ...state,
        stateList: action.payload.stateList
      };
    default:
      return state;
  }
};

export default geoReducer;
