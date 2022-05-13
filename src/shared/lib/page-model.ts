import { createEvent, Event } from 'effector';

interface PageModelParams {
  name: string;
}

export interface PageModel {
  mounted: Event<void>;
  unmounted: Event<void>;
}

export const createPage = ({ name }: PageModelParams) => {
  const mounted = createEvent();
  const unmounted = createEvent();

  return {
    mounted,
    unmounted,
  };
};
