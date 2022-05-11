import { PlayerPosition } from '@api';
import {
  combine, createEvent, createStore, sample,
} from 'effector';

export interface PlayerInfo {
  firstName: string;
  lastName: string;
  position: PlayerPosition;
  positionId: number;
  shirtNumber: number;
  birthDate: Date;
  displayId: number;
  id?: number;
}

const playerSaved = createEvent<PlayerInfo>();
const playerDeleted = createEvent<PlayerInfo>();

const $teamPlayers = createStore<Record<number, PlayerInfo>>({});

const $teamPlayersList = combine($teamPlayers, (teamPlayers) => Object.values(teamPlayers));

export const $deletedPlayers = createStore<Record<number, PlayerInfo>>({});

const playerSavedFn = (state: Record<number, PlayerInfo>, player: PlayerInfo) => {
  return {
    ...state,
    [player.displayId]: player,
  };
};

sample({
  clock: playerSaved,
  source: $teamPlayers,
  target: $teamPlayers,
  fn: playerSavedFn,
});

sample({
  clock: playerDeleted,
  source: $teamPlayers,
  target: $teamPlayers,
  fn: (state, player) => {
    const { [player.displayId]: _, ...newState } = state;
    return Object.keys(newState).sort().reduce((acc, key, index) => {
      const newDisplayId = index + 1;
      const newPlayer = newState[key as unknown as number];
      newPlayer.displayId = newDisplayId;

      return {
        ...acc,
        [newDisplayId]: newPlayer,
      };
    }, {});
  },
});

sample({
  clock: playerDeleted,
  source: $deletedPlayers,
  target: $deletedPlayers,
  fn: playerSavedFn,
  filter: (state, player) => {
    return Boolean(player.id);
  },
});

export const events = {
  playerSaved,
  playerDeleted,
};

export const teamPlayersModel = {
  events,
  $teamPlayers,
  $teamPlayersList,
  $deletedPlayers,
};
