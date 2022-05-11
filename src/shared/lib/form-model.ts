import { createEvent, Event } from 'effector';

export interface FormModelValues {
  [key: string]: any;
}

export interface FormModel<Values extends FormModelValues> {
  events: {
    formValidated: Event<Values>;
  };
}

export const createForm = <Values extends FormModelValues>() => {
  return {
    events: {
      formValidated: createEvent<Values>(),
    },
  };
};
