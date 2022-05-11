import { api, Flag } from '@api';

const endpoint = 'country-flags';

export const getFlags = () => {
  return api.get<Flag[]>(endpoint);
};
