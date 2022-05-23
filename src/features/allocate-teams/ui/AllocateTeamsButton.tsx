import { Tournament } from '@api';
import { Button } from '@ui';
import { allocateTeamsModal } from '../model';
import AllocateTeamsModal from './AllocateTeamsModal';

interface Props {
  tournament: Tournament | null;
}

const AllocateTeamsButton = ({ tournament }: Props) => {
  const handleClick = () => {
    allocateTeamsModal.opened();
  };

  return (
    <>
      <Button onClick={handleClick} disabled={tournament?.ready}>
        Allocate Teams to Groups
      </Button>
      <AllocateTeamsModal tournament={tournament} />
    </>
  );
};

export default AllocateTeamsButton;
