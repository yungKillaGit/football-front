import { api, Team } from 'shared/api';
import { createResourceApi } from '../resource-api';

const endpoint = '/teams';

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

export const teamsApi = createResourceApi<Team, CreateTeamDto, UpdateTeamDto>({
  endpoint,
});
