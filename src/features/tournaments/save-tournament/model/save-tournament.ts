import { CreateTournamentDto, UpdateTournamentDto } from '@api';
import { tournamentsModel } from '@entities/tournaments';
import { createForm } from '@lib';
import {
  createEvent, sample, split,
} from 'effector';
import { saveTournamentModal } from './save-tournament-modal';
import { tournamentTeamsModel } from './tournament-teams';

export interface SaveTournamentFormValues {
  name: string;
  startDate: Date;
  endDate: Date;
  id?: number;
}

const tournamentAdded = createEvent<SaveTournamentFormValues>();
const tournamentEdited = createEvent<SaveTournamentFormValues>();

export const saveTournamentModel = createForm<SaveTournamentFormValues>();

tournamentTeamsModel.$tournamentTeams.reset(saveTournamentModal.closed);

split({
  source: saveTournamentModel.events.formValidated,
  match: (params: SaveTournamentFormValues) => {
    if (params.id) {
      return 'edited';
    }
    return 'added';
  },
  cases: {
    added: tournamentAdded,
    edited: tournamentEdited,
  },
});

sample({
  clock: tournamentAdded,
  source: tournamentTeamsModel.$tournamentTeams,
  target: tournamentsModel.effects.createOneFx,
  fn: (teams, form) => {
    const dto: CreateTournamentDto = {
      ...form,
      participatingTeams: teams,
    };
    return {
      payload: dto,
    };
  },
});

sample({
  clock: tournamentEdited,
  source: tournamentTeamsModel.$tournamentTeams,
  target: tournamentsModel.effects.updateOneFx,
  fn: (teams, form) => {
    const dto: UpdateTournamentDto = {
      ...form,
      id: form.id as number,
      participatingTeams: teams,
    };
    return {
      payload: dto,
    };
  },
});

sample({
  clock: [tournamentsModel.effects.createOneFx.done, tournamentsModel.effects.updateOneFx.done],
  target: saveTournamentModal.closed,
});
