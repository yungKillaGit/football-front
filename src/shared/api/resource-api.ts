import {
  api, ApiResponse, EmptyHandlerParams, HandlerParams,
} from './api';
import { BaseModel } from './models';

interface ResourceApiParams {
  endpoint: string;
}

export interface IdPayload {
  id: number;
}

export interface ResourceApi<Entity, CreateDto, UpdateDto> {
  createOne: (params: HandlerParams<CreateDto>) => Promise<ApiResponse<Entity>>;
  deleteOne: (params: HandlerParams<IdPayload>) => Promise<ApiResponse<Entity>>;
  updateOne: (params: HandlerParams<UpdateDto>) => Promise<ApiResponse<Entity>>;
  getOne: (params: HandlerParams<IdPayload>) => Promise<ApiResponse<Entity>>;
  getMany: (params?: EmptyHandlerParams) => Promise<ApiResponse<Entity[]>>;
}

export const createResourceApi = <Entity extends BaseModel, CreateDto, UpdateDto extends IdPayload>({
  endpoint,
}: ResourceApiParams): ResourceApi<Entity, CreateDto, UpdateDto> => {
  return {
    createOne: ({ payload }) => {
      return api.post<Entity>(endpoint, {
        data: payload,
      });
    },
    deleteOne: ({ payload }) => {
      return api.delete<Entity>(`${endpoint}/${payload.id}`);
    },
    updateOne: ({ payload }) => {
      return api.put<Entity>(`${endpoint}/${payload.id}`, {
        data: payload,
      });
    },
    getOne: ({ payload, query }) => {
      return api.get<Entity>(`${endpoint}/${payload.id}`, { query });
    },
    getMany: (params = {}) => {
      return api.get<Entity[]>(endpoint, params);
    },
  };
};
