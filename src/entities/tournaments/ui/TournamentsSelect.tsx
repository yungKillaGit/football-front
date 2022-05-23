import { Tournament } from '@api';
import { reflect } from '@effector/reflect';
import { dashboardModel } from '@features/dashboard';
import {
  BaseFieldConfig,
  SelectInput,
} from '@ui';
import { tournamentsModel } from '../model';

interface Props {
  tournamentsList: Tournament[];
  tournamentsById: Record<number, Tournament>;
  selectedTournament: Tournament | null;
}

const TournamentsSelect = ({
  tournamentsById,
  tournamentsList,
  selectedTournament,
}: Props) => {
  const options = tournamentsList.map((tournament) => ({
    label: tournament.name,
    value: tournament.id,
  }));

  const handleChange = (value: number) => {
    dashboardModel.selectedTournamentChanged(tournamentsById[value]);
  };

  const field: BaseFieldConfig = {
    value: selectedTournament?.id || '',
    onChange: handleChange,
  };

  return (
    <SelectInput
      fullWidth
      options={options}
      field={field}
    />
  );
};

export default reflect({
  view: TournamentsSelect,
  bind: {
    tournamentsById: tournamentsModel.$entitiesById,
    tournamentsList: tournamentsModel.$entitiesList,
    selectedTournament: dashboardModel.$selectedTournament,
  },
  hooks: {
    mounted: tournamentsModel.effects.getManyFx,
  },
});
