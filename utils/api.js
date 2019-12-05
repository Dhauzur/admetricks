import axios from 'axios';
import {
  apiProtocol,
  apiHost,
  apiPort,
} from '../config';

let axiosApiInstance;

export const setupApiInstance = (username, password) => {
  axiosApiInstance = axios.create({
    baseURL: `${apiProtocol}://${apiHost}:${apiPort || 80}`,
    auth: {
      username,
      password,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getApiInstance = () => {
  if (axiosApiInstance) {
    return axiosApiInstance;
  }
  setupApiInstance();
  return axiosApiInstance;
};

export const setAccessToken = (token) => {
  const axiosApiInstance = getApiInstance();
  axiosApiInstance.defaults.headers.Authorization = token;
};

export const getAccessToken = () => {
  if (axiosApiInstance) {
    return axiosApiInstance.defaults.headers.Authorization;
  }
  throw new Error('Axios API instance not configured properly');
};

export const removeAccessToken = () => {
  setAccessToken(undefined);
};

export default {
  setupApiInstance,
  getApiInstance,
  setAccessToken,
  getAccessToken,
  removeAccessToken,
};
