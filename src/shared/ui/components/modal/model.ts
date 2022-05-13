import {
  createEvent,
  createStore,
  sample,
  Store,
  Event,
  Effect,
  attach,
} from 'effector';
import { createEffect } from 'effector/compat';

export interface ModalState {
  open: boolean;
  data?: any;
  name: string;
  loading: boolean;
}

interface ModalParams {
  name: string;
  initFx?: Effect<any, any>;
  mapParams?: (params: ModalState) => any;
}

type ModalOpenedParams = {
  data?: any;
} | void;

export interface ModalModel {
  opened: Event<ModalOpenedParams>;
  closed: Event<void>;
  initFx: Effect<any, any>;
  $modal: Store<ModalState>;
}

export const createModal = ({
  name,
  mapParams = (params) => ({ id: params.data }),
  initFx = createEffect(() => {}),
}: ModalParams): ModalModel => {
  const opened = createEvent<ModalOpenedParams>();
  const closed = createEvent();
  const initModalFx = attach({
    effect: initFx,
    mapParams,
  });

  const $modal = createStore<ModalState>({
    open: false,
    name,
    loading: true,
  });

  sample({
    clock: initModalFx.done,
    source: $modal,
    fn: (state) => ({
      ...state,
      loading: false,
    }),
    target: $modal,
  });

  const openedFn = (state: ModalState, eventParams: ModalOpenedParams) => {
    const { data, ...stateWithoutData } = state;
    return {
      ...stateWithoutData,
      ...eventParams,
      open: true,
      loading: !!eventParams?.data,
    };
  };

  sample({
    clock: opened,
    source: $modal,
    fn: openedFn,
    target: $modal,
  });

  sample({
    clock: opened,
    source: $modal,
    fn: (state) => state,
    filter: (state) => {
      return Boolean(state.data);
    },
    target: initModalFx,
  });

  sample({
    clock: closed,
    source: $modal,
    fn: (modalState) => {
      return {
        ...modalState,
        open: false,
      };
    },
    target: $modal,
  });

  return {
    $modal,
    opened,
    closed,
    initFx: initModalFx,
  };
};
