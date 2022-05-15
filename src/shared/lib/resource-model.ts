import {
  ApiResponse,
  BaseModel,
  EmptyHandlerParams,
  HandlerParams,
  IdPayload,
  ResourceApi,
} from '@api';
import {
  createEffect,
  createEvent,
  createStore,
  sample,
  Event,
  Effect,
  Store,
} from 'effector';
import { replace } from './common';
import { createPage, PageModel } from './page-model';

interface ResourceModelParams<Entity, CreateDto, UpdateDto> {
  name: string;
  resourceApi: ResourceApi<Entity, CreateDto, UpdateDto>;
}

export interface ResourceModel<Entity extends BaseModel, CreateDto, UpdateDto> {
  page: PageModel;
  events: {
    allEntitiesLoaded: Event<void>;
    entityDeleted: Event<HandlerParams<IdPayload>>;
  };
  effects: {
    createOneFx: Effect<HandlerParams<CreateDto>, ApiResponse<Entity>, Error>;
    deleteOneFx: Effect<HandlerParams<IdPayload>, ApiResponse<Entity>, Error>;
    updateOneFx: Effect<HandlerParams<UpdateDto>, ApiResponse<Entity>, Error>;
    getOneFx: Effect<HandlerParams<IdPayload>, ApiResponse<Entity>, Error>;
    getManyFx: Effect<EmptyHandlerParams, ApiResponse<Entity[]>, Error>;
  };
  $entitiesList: Store<Entity[]>;
  $areEntitiesLoading: Store<boolean>;
}

export const createResource = <Entity extends BaseModel, CreateDto, UpdateDto>({
  name,
  resourceApi,
}: ResourceModelParams<Entity, CreateDto, UpdateDto>): ResourceModel<Entity, CreateDto, UpdateDto> => {
  const page = createPage({ name });

  const allEntitiesLoaded = createEvent();
  const entityDeleted = createEvent<HandlerParams<IdPayload>>();

  const createOneFx = createEffect(resourceApi.createOne);
  const deleteOneFx = createEffect(resourceApi.deleteOne);
  const updateOneFx = createEffect(resourceApi.updateOne);
  const getOneFx = createEffect(resourceApi.getOne);
  const getManyFx = createEffect(resourceApi.getMany);

  const $entitiesList = createStore<Entity[]>([]).reset(page.unmounted);
  const $areEntitiesLoading = createStore(true).reset(page.unmounted);

  const events = {
    allEntitiesLoaded,
    entityDeleted,
  };

  const effects = {
    createOneFx,
    deleteOneFx,
    updateOneFx,
    getOneFx,
    getManyFx,
  };

  sample({
    clock: getManyFx.doneData,
    source: $entitiesList,
    target: [$entitiesList, allEntitiesLoaded],
    fn: (state, payload) => {
      return payload.response;
    },
  });

  sample({
    clock: allEntitiesLoaded,
    target: $areEntitiesLoading,
    fn: () => false,
  });

  sample({
    clock: [getOneFx.doneData, updateOneFx.doneData],
    source: $entitiesList,
    target: $entitiesList,
    fn: (state, payload) => {
      const existingIndex = state.findIndex((x) => x.id === payload.response.id);
      if (existingIndex !== -1) {
        return replace(state, existingIndex, payload.response);
      }
      return state;
    },
  });

  sample({
    clock: [createOneFx.doneData],
    source: $entitiesList,
    target: $entitiesList,
    fn: (state, payload) => {
      return [
        ...state,
        payload.response,
      ];
    },
  });

  sample({
    clock: deleteOneFx.doneData,
    source: $entitiesList,
    target: $entitiesList,
    fn: (state, payload) => {
      return state.filter((x) => x.id !== payload.response.id);
    },
  });

  sample({
    clock: entityDeleted,
    target: deleteOneFx,
  });

  return {
    page,
    events,
    effects,
    $entitiesList,
    $areEntitiesLoading,
  };
};
