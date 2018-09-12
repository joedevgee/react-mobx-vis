const apiUrl = "https://api.datausa.io";

export const getStates = async () => {
  const resp = await fetch(
    `${apiUrl}/attrs/search/?limit=50&q&kind=geo&sumlevel=040`
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
