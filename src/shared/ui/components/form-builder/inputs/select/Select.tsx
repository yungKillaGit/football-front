import { bem } from '@lib';
import { MenuItem, Select as MuiSelect, SelectChangeEvent } from '@mui/material';
import {
  ReactNode, useCallback, useEffect, useRef,
} from 'react';
import { FieldComponentProps } from '../../types';
import './Select.scss';

export interface SelectProps<ValueType extends unknown = unknown> extends FieldComponentProps<ValueType> {
  options: {
    value: number | string;
    label: string | ReactNode;
  }[];
  getInputValue?: (value: ValueType) => string | number | ValueType;
  getFieldValue?: (value: number | string) => ValueType;
  firstOptionSelected?: boolean;
}

const { block, element } = bem('Select');

const Select = <ValueType extends unknown>({
  field: {
    onChange,
    value,
    ...inputConfig
  },
  options,
  className = '',
  fullWidth,
  getInputValue,
  getFieldValue,
  firstOptionSelected = false,
}: SelectProps<ValueType>) => {
  const mapInputValueToFieldValue = useCallback((inputValue: number | string) => {
    return getFieldValue ? getFieldValue(inputValue) : inputValue;
  }, [getFieldValue]);

  const mapFieldValueToInputValue = () => {
    const inputValue = getInputValue ? getInputValue(value) : value;
    return inputValue as string | number;
  };

  const handleChange = (e: SelectChangeEvent<number | string>) => {
    onChange(mapInputValueToFieldValue(e.target.value));
  };

  useEffect(() => {
    if (firstOptionSelected && options.length > 0 && !value) {
      onChange(mapInputValueToFieldValue(options[0].value));
    }
  }, [firstOptionSelected, mapInputValueToFieldValue, onChange, options, value]);

  return (
    <MuiSelect<number | string>
      {...block({ fullWidth }, className)}
      {...inputConfig}
      fullWidth={fullWidth}
      onChange={handleChange}
      value={mapFieldValueToInputValue()}
      MenuProps={{
        MenuListProps: {
          className: element('menu-list').className,
        },
      }}
    >
      {
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))
      }
    </MuiSelect>
  );
};

export default Select;
