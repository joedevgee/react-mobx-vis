import GeoStore from "./GeoStore";

class RootStore {
  constructor() {
    this.geoStore = new GeoStore();
  }
}

export default RootStore;
