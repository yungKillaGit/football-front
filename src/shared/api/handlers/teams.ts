import { api, Team } from 'shared/api';

const endpoint = '/teams';

export const getTeams = () => {
  return api.get<Team[]>(endpoint);
};

export interface TeamByIdParams {
  id: number;
}

export const getTeam = ({ id }: TeamByIdParams) => {
  return api.get<Team>(`${endpoint}/${id}`);
};

export interface CreatePlayerDto {
  firstName?: string;
  lastName: string;
  birthDate: Date;
  shirtNumber: number;
  positionId: number;
}

interface TeamDto {
  name: string;
  countryCode: string;
  regionId: number;
  flagId?: number;
}

export interface CreateTeamDto extends TeamDto {
  players: CreatePlayerDto[];
}

export const createTeam = (payload: CreateTeamDto) => {
  return api.post<Team>(endpoint, {
    data: payload,
  });
};

export interface UpdatePlayerDto extends CreatePlayerDto {
  id?: number;
  team?: Team;
}

export interface UpdateTeamDto extends TeamDto {
  id: number;
  players: {
    changed: UpdatePlayerDto[];
    deleted: UpdatePlayerDto[];
  };
}

export const updateTeam = ({ id, ...payload }: UpdateTeamDto): any => {
  return api.put<Team>(`${endpoint}/${id}`, {
    data: payload,
  });
};

export const deleteTeam = ({ id }: TeamByIdParams) => {
  return api.delete<Team>(`${endpoint}/${id}`);
};
