import {
  createEvent,
  createStore,
  sample,
  Store,
  Event,
  attach,
} from 'effector';

export interface ModalState {
  open: boolean;
  data?: any;
  name: string;
  loading: boolean;
}

interface ModalParams {
  name: string;
  defaultState?: Partial<ModalState>;
}

type ModalOpenedParams = {
  data?: any;
} | void;

export interface ModalModel {
  $modal: Store<ModalState>;
  opened: Event<ModalOpenedParams>;
  closed: Event<void>;
  initialized: Event<void>;
}

export const createModal = ({
  name,
  defaultState,
}: ModalParams): ModalModel => {
  const opened = createEvent<ModalOpenedParams>();
  const closed = createEvent();
  const initialized = createEvent();

  const $modal = createStore<ModalState>({
    open: false,
    name,
    loading: true,
    ...defaultState,
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
    clock: initialized,
    source: $modal,
    fn: (state) => ({
      ...state,
      loading: false,
    }),
    target: $modal,
  });

  sample({
    clock: opened,
    source: $modal,
    fn: openedFn,
    target: $modal,
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
    initialized,
  };
};
