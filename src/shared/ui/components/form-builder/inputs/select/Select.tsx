import { bem } from '@lib';
import { MenuItem, Select as MuiSelect } from '@mui/material';
import { FieldComponentProps } from '../../types';
import './Select.scss';

interface Props extends FieldComponentProps {
  options: {
    value: number | string;
    label: string;
  }[];
}

const { block, element } = bem('Select');

const Select = ({ input, options, className = '' }: Props) => {
  return (
    <MuiSelect {...input} {...block({}, className)}>
      {
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))
      }
    </MuiSelect>
  );
};

export default Select;
