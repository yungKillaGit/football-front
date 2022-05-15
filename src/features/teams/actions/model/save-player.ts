import { PlayerPosition } from '@api';
import { createForm } from '@lib';
import { createModal } from '@ui';
import { sample } from 'effector';
import { createGate } from 'effector-react';
import { PlayerInfo, teamPlayersModel } from './team-players';

export interface SavePlayerFormValues {
  firstName: string;
  lastName: string;
  position: PlayerPosition;
  shirtNumber: number;
  birthDate: Date;
}

export const savePlayerModal = createModal({ name: 'save-player' });

export const savePlayerModel = createForm<SavePlayerFormValues>();

export const CurrentPlayerGate = createGate<PlayerInfo | null>();

const formValidated = savePlayerModel.events.formValidated.map((x) => ({
  ...x,
  positionId: x.position.id,
}));

sample({
  clock: formValidated,
  source: {
    players: teamPlayersModel.$teamPlayersList,
    existingPlayer: CurrentPlayerGate.state,
  },
  target: [
    teamPlayersModel.events.playerSaved,
    savePlayerModal.closed,
  ],
  fn: ({ players, existingPlayer }, clockData) => {
    return {
      ...clockData,
      displayId: existingPlayer?.displayId ? existingPlayer.displayId : players.length + 1,
    };
  },
});
