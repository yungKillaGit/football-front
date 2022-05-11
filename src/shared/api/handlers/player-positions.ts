import { api, PlayerPosition } from '@api';

const endpoint = 'player-positions';

export const getPlayerPositions = () => {
  return api.get<PlayerPosition[]>(endpoint);
};
