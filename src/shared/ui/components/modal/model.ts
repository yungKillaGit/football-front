import { createEvent, createStore } from 'effector';
import { useStore } from 'effector-react';

interface ModalConfig {
  open: boolean;
}

interface ModalEventParams {
  name: string;
}

const modalOpened = createEvent<ModalEventParams>();
const modalClosed = createEvent<ModalEventParams>();
const modalInitialized = createEvent<ModalEventParams>();

const $modals = createStore<Record<string, ModalConfig>>({})
  .on<ModalEventParams>(modalOpened, (state, params) => {
    return {
      ...state,
      [params.name]: {
        open: true,
      },
    };
  })
  .on<ModalEventParams>(modalClosed, (state, params) => {
    const newState = { ...state };
    delete newState[params.name];

    return newState;
  })
  .on<ModalEventParams>(modalInitialized, (state, params) => {
    return {
      ...state,
      [params.name]: {
        open: false,
      },
    };
  });

const useModalConfig = (modalName: string): ModalConfig | undefined => {
  return useStore($modals)[modalName];
};

export const events = {
  modalOpened,
  modalClosed,
  modalInitialized,
};

export const selectors = {
  useModalConfig,
};
