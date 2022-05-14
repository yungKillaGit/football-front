export interface SearchParam {
  [key: string]: number | string;
}

export interface SortParam {
  field: string;
  direction: 'ASC' | 'DESC';
}

export type QueryParam = 'search' | 'sort';

export interface QueryParams {
  search: SearchParam;
  sort: SortParam | SortParam[];
}

export type QueryBuilder = {
  [key in QueryParam]: (param: QueryParams[key]) => string;
};

export type PublicQueryBuilder = {
  [key in QueryParam]: (param: QueryParams[keyof QueryParams]) => string;
};

const processParamArray = (fn: any, paramValue: any | any[]) => {
  if (Array.isArray(paramValue)) {
    return paramValue.map((x) => fn(x)).join('&');
  }
  return fn(paramValue);
};

export const queryBuilder: QueryBuilder = {
  search: (param) => `s=${JSON.stringify(param)}`,
  sort: (param) => {
    return processParamArray((value: SortParam) => `sort=${value.field},${value.direction}`, param);
  },
};
