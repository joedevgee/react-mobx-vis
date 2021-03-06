// @flow
import type { GeoAction } from "../action/GeoAction";
import type { GeoStore, GeoDetail } from "../type/GeoType";
import { GeoConstant } from "../constant";

const geoReducer = (
  state: GeoStore = {
    stateList: [],
    detailList: [
      {
        id: GeoConstant.US_GEO
      }
    ]
  },
  action: GeoAction
): GeoStore => {
  switch (action.type) {
    case "SET_STATE_LIST":
      return {
        ...state,
        stateList: action.payload.stateList
      };
    case "SET_GEO_DETAIL":
      const { payload } = action;
      let newDetailList: Array<GeoDetail>;
      const filtered = state.detailList.filter(s => s.id === payload.id);
      if (filtered.length > 0) {
        newDetailList = state.detailList.map(
          s => (s.id === payload.id ? { ...s, ...payload } : s)
        );
      } else {
        newDetailList = [...state.detailList, ...[payload]];
      }
      return {
        ...state,
        detailList: newDetailList
      };
    default:
      return state;
  }
};

export default geoReducer;
