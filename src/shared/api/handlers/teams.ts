import { api, Team } from 'shared/api';

const endpoint = '/teams';

export const getTeams = () => {
  return api.get<Team[]>(endpoint);
};

export interface GetTeamParams {
  id: number;
}

export const getTeam = ({ id }: GetTeamParams) => {
  return api.get<Team>(`${endpoint}/${id}`);
};
