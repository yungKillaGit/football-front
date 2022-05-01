import { Button, modalsModel } from 'shared/ui';
import { SAVE_TEAM_MODAL_NAME } from 'features/teams/config';

const AddTeamButton = () => {
  const openModal = () => {
    modalsModel.events.modalOpened({ name: SAVE_TEAM_MODAL_NAME });
  };

  return (
    <Button sx={{ ml: 'auto' }} onClick={openModal}>
      Add
    </Button>
  );
};

export default AddTeamButton;
