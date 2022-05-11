import { api, ApiResponse } from './api';
import { BaseModel } from './types';

interface ResourceApiParams {
  endpoint: string;
}

export interface IdPayload {
  id: number;
}

export interface ResourceApi<Entity, CreateDto, UpdateDto> {
  createOne: (payload: CreateDto) => Promise<ApiResponse<Entity>>;
  deleteOne: (payload: IdPayload) => Promise<ApiResponse<Entity>>;
  updateOne: (payload: UpdateDto) => Promise<ApiResponse<Entity>>;
  getOne: (payload: IdPayload) => Promise<ApiResponse<Entity>>;
  getMany: () => Promise<ApiResponse<Entity[]>>;
}

export const createResourceApi = <Entity extends BaseModel, CreateDto, UpdateDto extends IdPayload>({
  endpoint,
}: ResourceApiParams): ResourceApi<Entity, CreateDto, UpdateDto> => {
  const createOne = (payload: CreateDto) => {
    return api.post<Entity>(endpoint, {
      data: payload,
    });
  };

  const deleteOne = (payload: IdPayload) => {
    return api.delete<Entity>(`${endpoint}/${payload.id}`);
  };

  const updateOne = (payload: UpdateDto) => {
    return api.put<Entity>(`${endpoint}/${payload.id}`, {
      data: payload,
    });
  };

  const getOne = (payload: IdPayload) => {
    return api.get<Entity>(`${endpoint}/${payload.id}`);
  };

  const getMany = () => {
    return api.get<Entity[]>(endpoint);
  };

  return {
    createOne,
    deleteOne,
    updateOne,
    getOne,
    getMany,
  };
};
