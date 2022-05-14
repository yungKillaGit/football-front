import { createForm } from '@lib';
import {
  createEvent, createStore, sample, split,
} from 'effector';

export interface SaveTournamentFormValues {
  name: string;
  startDate: Date;
  endDate: Date;
}

interface TeamParticipationChanged {
  selected: boolean;
  id: number;
}

const teamAdded = createEvent<TeamParticipationChanged>();
const teamDeleted = createEvent<TeamParticipationChanged>();
const teamParticipationChanged = createEvent<TeamParticipationChanged>();

const $tournamentTeams = createStore<number[]>([]);

sample({
  clock: teamAdded,
  target: $tournamentTeams,
  source: $tournamentTeams,
  fn: (state, payload) => {
    return {
      ...state,
      ...[payload.id],
    };
  },
});

sample({
  clock: teamDeleted,
  target: $tournamentTeams,
  source: $tournamentTeams,
  fn: (state, payload) => {
    return state.filter((x) => x !== payload.id);
  },
});

split({
  source: teamParticipationChanged,
  match: {
    added: ({ selected }: TeamParticipationChanged) => selected,
    deleted: ({ selected }: TeamParticipationChanged) => !selected,
  },
  cases: {
    added: teamAdded,
    deleted: teamDeleted,
  },
});

const formEvents = createForm<SaveTournamentFormValues>().events;

export const saveTournamentModel = {
  events: {
    ...formEvents,
    teamParticipationChanged,
  },
  $tournamentTeams,
};
