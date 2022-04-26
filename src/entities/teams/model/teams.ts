import { combine, createEffect, createStore } from 'effector';
import { Team, teamsApi } from 'shared/api';

export const getTeamsFx = createEffect(() => teamsApi.getTeams());
export const getTeamFx = createEffect((params: teamsApi.GetTeamParams) => teamsApi.getTeam(params));

export const $teams = createStore<Record<number, Team>>({})
  .on(getTeamsFx.doneData, (state, payload) => {
    return payload.response.reduce((acc, team) => {
      return {
        ...acc,
        [team.id]: team,
      };
    }, {});
  })
  .on(getTeamFx.doneData, (state, payload) => {
    return {
      ...state,
      [payload.response.id]: payload.response,
    };
  });

export const $teamsList = combine($teams, (teams) => Object.values(teams));

export const effects = {
  getTeamsFx,
  getTeamFx,
};
