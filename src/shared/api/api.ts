import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from 'shared/api/config';
import {
  QueryParams, queryBuilder, PublicQueryBuilder, QueryParam,
} from './request-options';

export type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export interface RequestConfig<TBody = any> {
  data?: TBody;
  query?: Partial<QueryParams>;
}

export interface ApiResponse<TResponse = any> {
  response: TResponse;
}

export interface HandlerParams<Payload> {
  payload: Payload;
  query?: Partial<QueryParams>;
}

export type EmptyHandlerParams = {
  query: Partial<QueryParams>;
} | void | undefined | EmptyObject;

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

const getRequestUrl = (url: string, config?: RequestConfig) => {
  if (config?.query) {
    const builder = queryBuilder as unknown as PublicQueryBuilder;
    const queryParams: string[] = [];

    Object.keys(config.query).forEach((queryKey) => {
      if (config.query) {
        const queryParam = config.query[queryKey as QueryParam];
        if (queryParam) {
          queryParams.push(builder[queryKey as QueryParam](queryParam));
        }
      }
    });

    return `${url}?${queryParams.join('&')}`;
  }

  return url;
};

const getSpecificMethodInstance = (method: RequestMethod) => {
  return <TResponse = any>(url: string, config?: RequestConfig): Promise<ApiResponse<TResponse>> => {
    return sendRequest(getRequestConfig(method, getRequestUrl(url, config), config));
  };
};

const validMethods: RequestMethod[] = ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'];

export const api = validMethods.reduce<ApiInstance>((acc, key) => {
  return {
    ...acc,
    [key.toLowerCase()]: getSpecificMethodInstance(key),
  };
}, {} as ApiInstance);
