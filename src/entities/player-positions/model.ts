import { PlayerPosition, playerPositionsApi } from '@api';
import { combine, createEffect, createStore } from 'effector';

const getPlayerPositionsFx = createEffect(() => playerPositionsApi.getPlayerPositions());

export const $playerPositions = createStore<Record<number, PlayerPosition>>({})
  .on(getPlayerPositionsFx.doneData, (state, payload) => {
    return payload.response.reduce((acc, position) => {
      return {
        ...acc,
        [position.id]: position,
      };
    }, {});
  });

export const $playerPositionsList = combine($playerPositions, (playerPositions) => Object.values(playerPositions));

export const effects = {
  getPlayerPositionsFx,
};
