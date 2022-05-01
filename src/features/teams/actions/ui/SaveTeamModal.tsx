import { Modal } from 'shared/ui';
import { SAVE_TEAM_MODAL_NAME } from 'features/teams/config';
import SaveTeamForm from './SaveTeamForm';

const SaveTeamModal = () => {
  return (
    <Modal name={SAVE_TEAM_MODAL_NAME} title="Add/Edit Team">
      <SaveTeamForm />
    </Modal>
  );
};

export default SaveTeamModal;
