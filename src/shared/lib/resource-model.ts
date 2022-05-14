import {
  ApiResponse,
  BaseModel,
  EmptyHandlerParams,
  HandlerParams,
  IdPayload,
  ResourceApi,
} from '@api';
import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
  Event,
  Effect,
  Store,
} from 'effector';
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
  $entities: Store<Record<number, Entity>>;
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

  const $entities = createStore<Record<number, Entity>>({});
  const $entitiesList = combine($entities, (entities) => Object.values(entities));
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
    source: $entities,
    target: $entities,
    fn: (state, payload) => {
      return payload.response.reduce((acc, entity) => {
        return {
          ...acc,
          [entity.id]: entity,
        };
      }, {});
    },
  });

  sample({
    clock: getManyFx.doneData,
    target: [$entitiesList, allEntitiesLoaded],
    fn: (payload) => {
      return payload.response;
    },
  });

  sample({
    clock: allEntitiesLoaded,
    target: $areEntitiesLoading,
    fn: () => false,
  });

  sample({
    clock: [getOneFx.doneData, createOneFx.doneData, updateOneFx.doneData],
    source: $entities,
    target: $entities,
    fn: (state, payload) => {
      return {
        ...state,
        [payload.response.id]: payload.response,
      };
    },
  });

  sample({
    clock: deleteOneFx.doneData,
    source: $entities,
    target: $entities,
    fn: (state, payload) => {
      const { [payload.response.id]: _, ...newState } = state;
      return newState;
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
    $entities,
    $entitiesList,
    $areEntitiesLoading,
  };
};
