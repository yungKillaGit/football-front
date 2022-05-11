import { Region } from '@api';
import { reflect } from '@effector/reflect';
import {
  FormBuilder,
  FormBuilderProps,
  SelectProps,
} from '@ui';
import { regionsModel } from '..';

interface Props extends FormBuilderProps {
  regions: Record<number, Region>;
  regionsList: Region[];
  firstOptionSelected?: boolean;
}

const RegionsSelect = ({
  regions,
  regionsList,
  firstOptionSelected,
  ...builderProps
}: Props) => {
  const options = regionsList.map((region) => ({
    label: region.name,
    value: region.id,
  }));

  const getInputValue = (value: Region | null) => {
    return value?.id || '';
  };

  const getFieldValue = (value: number | string) => {
    return regions[+value];
  };

  return (
    <FormBuilder.Select<SelectProps<Region | null>>
      {...builderProps}
      options={options}
      firstOptionSelected={firstOptionSelected}
      getInputValue={getInputValue}
      getFieldValue={getFieldValue}
    />
  );
};

export default reflect({
  view: RegionsSelect,
  bind: {
    regionsList: regionsModel.$regionsList,
    regions: regionsModel.$regions,
  },
  hooks: {
    mounted: regionsModel.effects.getRegionsFx,
  },
});
