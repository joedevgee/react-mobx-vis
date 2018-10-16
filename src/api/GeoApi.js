// @flow
const apiUrl = "https://api.datausa.io";

const camelCaseConverter = (value: string): string =>
  value.replace(/_([a-z])/g, function(g) {
    return g[1].toUpperCase();
  });

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

const responseDataHelper = data => {
  const tranHeader = data.headers.map(h => camelCaseConverter(h));
  return data.data.map(e => {
    const dataObject = {};
    tranHeader.forEach((h, i) => {
      dataObject[h] = e[i];
    });
    return dataObject;
  });
};

const getGeoDetail = async (payload: { [string]: string | number }) => {
  const query = Object.keys(payload)
    .filter(k => k !== "type")
    .map(k => `${k}=${payload[k]}`)
    .join("&");
  const resp = await fetch(`${apiUrl}/api?${query}`);
  const data = await resp.json();
  switch (payload.type) {
    case "income":
      return { income: responseDataHelper(data) };
    case "occupation":
      const occData = responseDataHelper(data);
      return Promise.all(
        occData.map(o =>
          fetch(`${apiUrl}/attrs/soc/${o.soc}`) // Fetch Occupation detail
            .then(resp => resp.json())
            .then(occJson => ({ ...o, name: occJson.data[0][1] }))
        )
      ).then(results => ({ occupation: results }));
    default:
      console.error("The type is not specified: ", payload.type);
  }
};

const getGeoAttribute = async (payload: { id: string }) => {
  const resp = await fetch(`${apiUrl}/attrs/geo/${payload.id}`);
  const data = await resp.json();
  const attr = {
    id: data.data[0][8],
    fullName: data.data[0][9],
    imageLink: data.data[0][3],
    imageAuthor: data.data[0][6]
  };
  return attr;
};

const GeoApi = {
  getStates,
  getGeoDetail,
  getGeoAttribute
};

export default GeoApi;
