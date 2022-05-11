import {
  CreateTeamDto,
  Team,
  teamsApi,
  UpdateTeamDto,
} from 'shared/api';
import { createResource } from '@lib';

export const teamsModel = createResource<Team, CreateTeamDto, UpdateTeamDto>({
  name: 'teams',
  resourceApi: teamsApi,
});
