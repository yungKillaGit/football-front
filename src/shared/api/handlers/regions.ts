import { api, Region } from '@api';

const endpoint = '/regions';

export const getRegions = () => {
  return api.get<Region[]>(endpoint);
};
