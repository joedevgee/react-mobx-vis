// @flow
import { observable, action, runInAction } from "mobx";
import { getStates } from "../api/GeoApi";
import type { LocationList } from "../type/GeoType";

class GeoStore {
  @observable
  stateList: LocationList = [];

  constructor() {
    this.fetchStates();
  }

  @action
  fetchStates = async () => {
    this.stateList = [];
    try {
      const data = await getStates();
      runInAction(() => (this.stateList = data));
    } catch (err) {
      console.error("Failed getting state list");
    }
  };
}

export default GeoStore;
