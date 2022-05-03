import { Region } from '@api';
import { reflect } from '@effector/reflect';
import { FormBuilder } from '@ui';
import { Field } from 'effector-forms';
import { regionsModel } from '..';

interface Props {
  regions: Region[];
  field: Field<number | null>;
  label?: string;
}

const RegionsSelect = ({ regions, field, label }: Props) => {
  const options = regions.map((region) => ({
    label: region.name,
    value: region.id,
  }));

  return (
    <FormBuilder.Select
      field={field}
      label={label}
      options={options}
    />
  );
};

export default reflect({
  view: RegionsSelect,
  bind: { regions: regionsModel.$regionsList },
  hooks: {
    mounted: regionsModel.effects.getRegionsFx,
  },
});
