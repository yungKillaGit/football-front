import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from 'shared/api/config';

export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export interface RequestConfig<TBody = any> {
  data?: TBody;
}

export interface ApiResponse<TResponse = any> {
  response: TResponse;
}

type MethodHandler = <TResponse=any>(url: string, config?: RequestConfig) => Promise<ApiResponse<TResponse>>;

type ApiInstance = Record<Lowercase<RequestMethod>, MethodHandler>

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

const getSpecificMethodInstance = (method: RequestMethod) => {
  return <TResponse = any>(url: string, config?: RequestConfig): Promise<ApiResponse<TResponse>> => {
    return sendRequest(getRequestConfig(method, url, config));
  };
};

const validMethods: RequestMethod[] = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'];

export const api = validMethods.reduce<ApiInstance>((acc, key) => {
  return {
    ...acc,
    [key.toLowerCase()]: getSpecificMethodInstance(key),
  };
}, {} as ApiInstance);
