import { AllocateTeamsDto, tournamentsApi } from '@api';
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
  clock: allocateTeamsFx.done,
  target: allocateTeamsModal.closed,
});

export const allocateTeamsModel = {
  events: {
    teamsAllocated,
  },
};
