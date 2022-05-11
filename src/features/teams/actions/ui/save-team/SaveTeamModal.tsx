import { teamsModel } from '@entities/teams';
import { withModal } from '@ui';
import { useStore } from 'effector-react';
import { saveTeamModal } from '../../model/save-team';
import SaveTeamForm from './SaveTeamForm';

const SaveTeamModal = withModal({
  getTitle: (modalData) => (modalData ? 'Edit Team' : 'Add team'),
  modal: saveTeamModal,
})(({ modalData }) => {
  const currentTeam = modalData ? useStore(teamsModel.$teams)[+modalData] : null;
  return <SaveTeamForm currentTeam={currentTeam} />;
});

export default SaveTeamModal;
