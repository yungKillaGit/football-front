import { Region, regionsApi } from '@api';
import { combine, createEffect, createStore } from 'effector';

const getRegionsFx = createEffect(() => regionsApi.getRegions());

export const $regions = createStore<Record<number, Region>>({})
  .on(getRegionsFx.doneData, (state, payload) => {
    return payload.response.reduce((acc, region) => {
      return {
        ...acc,
        [region.id]: region,
      };
    }, {});
  });

export const $regionsList = combine($regions, (regions) => Object.values(regions));

export const effects = {
  getRegionsFx,
};
