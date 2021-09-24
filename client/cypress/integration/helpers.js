export const requestBaseApi = ({ base }, endpoint) => `${base}${endpoint}`;

export const requestApi = (api, endpoint) =>
  requestBaseApi(api, `${api.api}${endpoint}`);
