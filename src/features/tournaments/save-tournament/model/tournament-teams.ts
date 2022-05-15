import { EmptyHandlerParams, teamsApi } from '@api';
import { tournamentsModel } from '@entities/tournaments';
import {
  createEvent,
  createStore,
  sample,
  split,
  attach,
  createEffect,
  restore,
} from 'effector';

interface TeamParticipationChanged {
  selected: boolean;
  id: number;
}

const teamParticipationChanged = createEvent<TeamParticipationChanged>();

const teamAdded = createEvent<TeamParticipationChanged>();
const teamDeleted = createEvent<TeamParticipationChanged>();

const getTeamsFx = attach({
  effect: createEffect(teamsApi.getMany),
  mapParams: () => {
    const payload: EmptyHandlerParams = {
      query: {
        sort: {
          field: 'name',
          direction: 'ASC',
        },
      },
    };
    return payload;
  },
});

const $teams = restore(getTeamsFx.doneData.map(({ response }) => response), []);
const $tournamentTeams = createStore<number[]>([]);

export const tournamentTeamsModel = {
  events: {
    teamParticipationChanged,
  },
  effects: {
    getTeamsFx,
  },
  $tournamentTeams,
  $teams,
};

sample({
  clock: tournamentsModel.effects.getOneFx.doneData,
  target: $tournamentTeams,
  fn: ({ response }) => {
    return response.teams.map((x) => x.id);
  },
});

sample({
  clock: teamAdded,
  target: $tournamentTeams,
  source: $tournamentTeams,
  fn: (state, payload) => {
    const newState = [...state];
    newState.push(payload.id);
    return newState;
  },
});

sample({
  clock: teamDeleted,
  target: $tournamentTeams,
  source: $tournamentTeams,
  fn: (state, payload) => {
    return state.filter((x) => x !== payload.id);
  },
});

split({
  source: teamParticipationChanged,
  match: {
    added: ({ selected }: TeamParticipationChanged) => selected,
    deleted: ({ selected }: TeamParticipationChanged) => !selected,
  },
  cases: {
    added: teamAdded,
    deleted: teamDeleted,
  },
});
