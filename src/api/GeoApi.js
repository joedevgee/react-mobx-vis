// @flow
import type { GeoIncome } from "../type/GeoType";
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

const incomeDataHelper = (data: {
  data: Array<any>,
  headers: Array<string>
}): GeoIncome => {
  const tranHeader = data.headers.map(h => camelCaseConverter(h));
  return data.data.map(e => {
    const incomeObject = {};
    tranHeader.forEach((h, i) => {
      incomeObject[h] = e[i];
    });
    return incomeObject;
  });
};

const getGeoDetail = async (payload: {
  type: string,
  required: Array<string>,
  sumlevel: string,
  year?: Array<number>,
  geo: string
}) => {
  const resp = await fetch(
    `${apiUrl}/api/?show=geo&required=${payload.required.join(
      ","
    )}&sumlevel=${payload.sumlevel || "all"}&year=${
      payload.year ? payload.year.join(",") : "all"
    }&geo=${payload.geo}`
  );
  const data = await resp.json();
  // const geoDetail = {};
  switch (payload.type) {
    case "income":
      // Set income for detail
      // geoDetail.income = incomeDataHelper(data);
      return { income: incomeDataHelper(data) };
    default:
      console.error("The type is not specified: ", payload.type);
  }
  // return geoDetail;
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
