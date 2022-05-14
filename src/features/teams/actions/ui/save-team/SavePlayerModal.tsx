import { EffectorModal } from '@ui';
import { combine } from 'effector';
import { savePlayerModal } from '../../model/save-player';
import SavePlayerForm from './SavePlayerForm';
import { teamPlayersModel } from '../../model/team-players';

const SavePlayerModal = EffectorModal({
  View: SavePlayerForm,
  routing: false,
  getTitle: (modalData) => (modalData ? 'Edit Player' : 'Add player'),
  modal: savePlayerModal,
  $modalProps: combine(savePlayerModal.$modal, teamPlayersModel.$teamPlayers, ({ data }, teamPlayers) => {
    if (data) {
      return {
        currentPlayer: teamPlayers[data],
      };
    }
    return {};
  }),
});

export default SavePlayerModal;
