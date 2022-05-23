import { Tournament } from '@api';
import { createEvent, createStore, sample } from 'effector';

export const selectedTournamentChanged = createEvent<Tournament>();

export const $selectedTournament = createStore<Tournament | null>(null);

sample({
  clock: selectedTournamentChanged,
  target: $selectedTournament,
});
