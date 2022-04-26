import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from 'shared/api/config';

export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

export interface RequestConfig<TBody = any> {
  data?: TBody;
}

export interface ApiResponse<TResponse = any> {
  response: TResponse;
}

const sendRequest = async (config: AxiosRequestConfig) => {
  return axios(config).then((response) => ({
    response: response.data.data,
  }));
};

const getRequestConfig = (
  method: RequestMethod,
  url: string,
  config: RequestConfig = {},
): AxiosRequestConfig => {
  return {
    ...config,
    baseURL: API_BASE_URL,
    method,
    url,
  };
};

export const api = {
  get: <TResponse = any>(url: string, config?: RequestConfig): Promise<ApiResponse<TResponse>> => {
    return sendRequest(getRequestConfig('GET', url, config));
  },
  post: (url: string, config?: RequestConfig) => {
    return sendRequest(getRequestConfig('POST', url, config));
  },
  delete: (url: string, config?: RequestConfig) => {
    return sendRequest(getRequestConfig('DELETE', url, config));
  },
  put: (url: string, config?: RequestConfig) => {
    return sendRequest(getRequestConfig('PUT', url, config));
  },
};
