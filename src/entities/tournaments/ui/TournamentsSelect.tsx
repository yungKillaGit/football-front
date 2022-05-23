import { Tournament } from '@api';
import { reflect } from '@effector/reflect';
import {
  BaseFieldConfig,
  SelectInput,
} from '@ui';
import { tournamentsModel } from '../model';

interface Props {
  tournamentsList: Tournament[];
  field: BaseFieldConfig;
}

const TournamentsSelect = ({
  tournamentsList,
  field,
}: Props) => {
  const options = tournamentsList.map((tournament) => ({
    label: tournament.name,
    value: tournament.id,
  }));

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
    tournamentsList: tournamentsModel.$entitiesList,
  },
  hooks: {
    mounted: tournamentsModel.effects.getManyFx,
  },
});
