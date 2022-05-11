import { createEvent } from 'effector';

interface PageModelParams {
  name: string;
}

export const createPage = ({ name }: PageModelParams) => {
  const mounted = createEvent();
  const unmounted = createEvent();

  return {
    mounted,
    unmounted,
  };
};
