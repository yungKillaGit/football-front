import { tournamentsModel } from '@entities/tournaments';
import {
  createEvent, createStore, sample, split,
} from 'effector';

interface TeamParticipationChanged {
  selected: boolean;
  id: number;
}

const teamParticipationChanged = createEvent<TeamParticipationChanged>();

const teamAdded = createEvent<TeamParticipationChanged>();
const teamDeleted = createEvent<TeamParticipationChanged>();

const $tournamentTeams = createStore<number[]>([]);

export const tournamentTeamsModel = {
  events: {
    teamParticipationChanged,
  },
  $tournamentTeams,
};

sample({
  clock: tournamentsModel.effects.getOneFx.doneData,
  target: $tournamentTeams,
  fn: ({ response }) => {
    return response.teams.map((x) => x.id);
  },
});

sample({
  clock: teamAdded,
  target: $tournamentTeams,
  source: $tournamentTeams,
  fn: (state, payload) => {
    const newState = [...state];
    newState.push(payload.id);
    return newState;
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
