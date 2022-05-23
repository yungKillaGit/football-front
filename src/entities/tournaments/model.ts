import {
  CreateTournamentDto, Tournament, tournamentsCrudApi, UpdateTournamentDto,
} from '@api';
import { createResource } from '@lib';

const name = 'tournaments';

export const tournamentsModel = createResource<Tournament, CreateTournamentDto, UpdateTournamentDto>({
  name,
  resourceApi: tournamentsCrudApi,
});
