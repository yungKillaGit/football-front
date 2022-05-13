import { useStore } from 'effector-react';

import { tournamentsModel } from '@entities/tournaments';
import { withModal } from '@ui';
import { saveTournamentModal } from '../model/save-tournament';
import SaveTournamentForm from './SaveTournamentForm';

const SaveTournamentModal = withModal({
  getTitle: (modalData) => (modalData ? 'Edit tournament' : 'Add tournament'),
  modal: saveTournamentModal,
})(({ modalData }) => {
  const currentTournament = modalData ? useStore(tournamentsModel.$entities)[+modalData] : null;
  return <SaveTournamentForm tournament={currentTournament} />;
});

export default SaveTournamentModal;
