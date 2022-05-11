import { Button } from 'shared/ui';
import { saveTeamModal } from '../model/save-team';

const AddTeamButton = () => {
  const openModal = () => {
    saveTeamModal.opened();
  };

  return (
    <Button sx={{ ml: 'auto' }} onClick={openModal}>
      Add
    </Button>
  );
};

export default AddTeamButton;
