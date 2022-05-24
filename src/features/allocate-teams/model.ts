import { AllocateTeamsDto, tournamentsApi } from '@api';
import { tournamentsModel } from '@entities/tournaments';
import { replace } from '@lib';
import { createModal } from '@ui';
import { createEffect, createEvent, sample } from 'effector';

const teamsAllocated = createEvent<AllocateTeamsDto>();

const allocateTeamsFx = createEffect(tournamentsApi.allocateTeams);

export const allocateTeamsModal = createModal({ name: 'allocate-teams' });

sample({
  clock: teamsAllocated,
  target: allocateTeamsFx,
  fn: (dto) => {
    return {
      payload: dto,
    };
  },
});

sample({
  clock: allocateTeamsFx.doneData,
  target: allocateTeamsModal.closed,
});

sample({
  clock: allocateTeamsFx.doneData,
  source: tournamentsModel.$entitiesList,
  target: tournamentsModel.$entitiesList,
  fn: (state, payload) => {
    const existingIndex = state.findIndex((x) => x.id === payload.response.id);
    if (existingIndex !== -1) {
      return replace(state, existingIndex, payload.response);
    }
    if (state.length === 0) {
      return [payload.response];
    }
    return state;
  },
});

export const allocateTeamsModel = {
  events: {
    teamsAllocated,
  },
};
