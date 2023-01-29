import axios from "axios";
import { Buffer } from "buffer";

const get = async (url: string) => {
  return await axios.get(url);
};

const post = async (url: string, data: any) => {
  return await axios.post(url, data);
};

const put = async (url: string, data?: any, config?: any) => {
  if (
    config !== null &&
    config !== undefined &&
    config.auth !== null &&
    config.auth !== undefined
  ) {
    const credentials = Buffer.from(
      config.auth.username + ":" + config.auth.password
    ).toString("base64");
    const basicAuth = "Basic " + credentials;

    return await axios.put(url, data, {
      headers: { Authorization: basicAuth },
    });
  }

  return await axios.put(url, data);
};

const setHeader = (key: string, value: string) => {
  axios.defaults.headers.common[key] = value;
};

const removeHeader = (key: string) => {
  delete axios.defaults.headers.common[key];
};

const setAuthToken = (token?: string) => {
  if (token) {
    setHeader("Authorization", `Bearer ${token}`);
  } else {
    removeHeader("Authorization");
  }
};

const isAuthTokenSetted = () => {
  return axios.defaults.headers.common["Authorization"];
};

const HTTPService = {
  get,
  post,
  put,
  setAuthToken,
  setHeader,
  removeHeader,
  isAuthTokenSetted,
};

export default HTTPService;
