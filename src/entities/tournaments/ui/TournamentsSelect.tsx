import { Tournament } from '@api';
import {
  BaseFieldConfig,
  SelectInput,
} from '@ui';

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
      firstOptionSelected
    />
  );
};

export default TournamentsSelect;
