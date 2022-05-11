import { withModal } from '@ui';
import { useStore } from 'effector-react';
import { savePlayerModal } from '../../model/save-player';
import SavePlayerForm from './SavePlayerForm';
import { teamPlayersModel } from '../../model/team-players';

const SavePlayerModal = withModal({
  routing: false,
  getTitle: (modalData) => (modalData ? 'Edit Player' : 'Add player'),
  modal: savePlayerModal,
})(({ modalData }) => {
  const currentPlayer = modalData ? useStore(teamPlayersModel.$teamPlayers)[+modalData] : null;
  return (
    <SavePlayerForm currentPlayer={currentPlayer} />
  );
});

export default SavePlayerModal;
