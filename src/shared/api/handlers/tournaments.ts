import { Tournament } from '@api';
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

export const tournamentsApi = createResourceApi<Tournament, CreateTournamentDto, UpdateTournamentDto>({ endpoint });
