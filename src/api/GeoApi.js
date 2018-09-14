// @flow
const apiUrl = "https://api.datausa.io";

const getStates = async (payload: { limit: number, sumlevel: string }) => {
  const resp = await fetch(
    `${apiUrl}/attrs/search/?limit=${payload.limit}&q&kind=geo&sumlevel=${
      payload.sumlevel
    }`
  );
  const data = await resp.json();
  const stateList = data.data.map(state => {
    return {
      id: state[0],
      name: state[1],
      zValue: state[2],
      kind: state[3],
      display: state[4],
      sumLevel: state[5],
      isStem: state[6],
      urlName: state[7]
    };
  });
  return stateList;
};

const GeoApi = {
  getStates
};

export default GeoApi;
