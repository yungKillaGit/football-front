import {
  combine, createEffect, createEvent, createStore, sample,
} from 'effector';
import { Team, teamsApi } from 'shared/api';

const teamDeleted = createEvent<teamsApi.TeamByIdParams>();

const getTeamsFx = createEffect(teamsApi.getTeams);
const getTeamFx = createEffect(teamsApi.getTeam);
const createTeamFx = createEffect(teamsApi.createTeam);
const updateTeamFx = createEffect(teamsApi.updateTeam);
const deleteTeamFx = createEffect(teamsApi.deleteTeam);

export const $teams = createStore<Record<number, Team>>({});

export const $teamsList = combine($teams, (teams) => Object.values(teams));

sample({
  clock: getTeamsFx.doneData,
  source: $teams,
  target: $teams,
  fn: (state, payload) => {
    return payload.response.reduce((acc, team) => {
      return {
        ...acc,
        [team.id]: team,
      };
    }, {});
  },
});

sample({
  clock: [getTeamFx.doneData, createTeamFx.doneData, updateTeamFx.doneData],
  source: $teams,
  target: $teams,
  fn: (state, payload) => {
    return {
      ...state,
      [payload.response.id]: payload.response,
    };
  },
});

sample({
  clock: deleteTeamFx.doneData,
  source: $teams,
  target: $teams,
  fn: (state, payload) => {
    const { [payload.response.id]: _, ...newState } = state;
    return newState;
  },
});

sample({
  clock: teamDeleted,
  target: deleteTeamFx,
});

export const events = {
  teamDeleted,
};

export const effects = {
  getTeamsFx,
  getTeamFx,
  createTeamFx,
  updateTeamFx,
  deleteTeamFx,
};
