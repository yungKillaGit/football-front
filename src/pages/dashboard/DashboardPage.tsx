import { Tournament } from '@api';
import { reflect } from '@effector/reflect';
import { tournamentsModel, TournamentsSelect } from '@entities/tournaments';
import { dashboardModel } from '@features/dashboard';
import { Box } from '@mui/material';
import { BaseFieldConfig } from '@ui';

interface Props {
  tournamentsById: Record<number, Tournament>;
  selectedTournament: Tournament | null;
}

const DashboardPage = ({ tournamentsById, selectedTournament }: Props) => {
  const handleChange = (value: number) => {
    dashboardModel.selectedTournamentChanged(tournamentsById[value]);
  };

  const field: BaseFieldConfig = {
    value: selectedTournament?.id || '',
    onChange: handleChange,
  };

  return (
    <Box>
      <TournamentsSelect field={field} />
    </Box>
  );
};

export default reflect({
  view: DashboardPage,
  bind: {
    tournamentsById: tournamentsModel.$entitiesById,
    selectedTournament: dashboardModel.$selectedTournament,
  },
  hooks: {
    mounted: tournamentsModel.effects.getManyFx,
  },
});
