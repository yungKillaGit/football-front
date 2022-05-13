import { tournamentsModel } from '@entities/tournaments';
import { createForm } from '@lib';
import { createModal } from '@ui';

export interface SaveTournamentFormValues {
  name: string;
  startDate: Date;
  endDate: Date;
}

export const saveTournamentModal = createModal({
  name: 'save-tournament',
  initFx: tournamentsModel.effects.getOneFx,
});

export const saveTournamentModel = createForm<SaveTournamentFormValues>();
