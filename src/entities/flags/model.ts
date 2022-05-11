import { Flag, flagsApi } from '@api';
import { combine, createEffect, createStore } from 'effector';

const getFlagsFx = createEffect(() => flagsApi.getFlags());

export const $flags = createStore<Record<number, Flag>>({})
  .on(getFlagsFx.doneData, (state, payload) => {
    return payload.response.reduce((acc, position) => {
      return {
        ...acc,
        [position.id]: position,
      };
    }, {});
  });

export const $flagsList = combine($flags, (playerPositions) => Object.values(playerPositions));

export const effects = {
  getFlagsFx,
};
