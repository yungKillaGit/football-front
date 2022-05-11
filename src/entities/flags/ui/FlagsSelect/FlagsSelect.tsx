import { API_BASE_URL, Flag } from '@api';
import { reflect } from '@effector/reflect';
import { bem } from '@lib';
import {
  FormBuilder,
  FormBuilderProps,
  SelectProps,
} from '@ui';
import { flagsModel } from '../../index';
import './FlagsSelect.scss';

interface Props extends FormBuilderProps {
  flags: Record<number, Flag>;
  flagsList: Flag[];
}

const { block, element } = bem('FlagsSelect');

const FlagsSelect = ({
  flags,
  flagsList,
  ...fieldProps
}: Props) => {
  const options = flagsList.map((x) => ({
    label: (
      <img
        src={`${API_BASE_URL}/${x.path}`}
        alt="team flag"
      />
    ),
    value: x.id,
  }));

  const getInputValue = (value: Flag | null) => {
    return value?.id || '';
  };

  const getFieldValue = (value: number | string) => {
    return flags[+value];
  };

  return (
    <FormBuilder.Select<SelectProps<Flag | null>>
      {...fieldProps}
      options={options}
      getInputValue={getInputValue}
      getFieldValue={getFieldValue}
      {...block()}
    />
  );
};

export default reflect({
  view: FlagsSelect,
  bind: {
    flags: flagsModel.$flags,
    flagsList: flagsModel.$flagsList,
  },
  hooks: {
    mounted: flagsModel.effects.getFlagsFx,
  },
});
