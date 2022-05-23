import {
  api, HandlerParams, IdPayload, Tournament,
} from '@api';
import { createResourceApi } from '../resource-api';

const endpoint = '/tournaments';

export interface CreateTournamentDto {
  name: string;
  startDate: Date;
  endDate: Date;
  participatingTeams: number[];
}

export interface UpdateTournamentDto extends CreateTournamentDto {
  id: number;
}

export interface GroupTeamDto {
  id: number;
  order: number;
}

export interface AllocateTeamsDto {
  id: number;
  groupTeams: Record<number, GroupTeamDto[]>;
}

export const tournamentsCrudApi = createResourceApi<Tournament, CreateTournamentDto, UpdateTournamentDto>({ endpoint });

export const tournamentsApi = {
  allocateTeams: (params: HandlerParams<AllocateTeamsDto>) => {
    return api.post<Tournament>(`${endpoint}/${params.payload.id}/teams`, { data: params.payload.groupTeams });
  },
};
