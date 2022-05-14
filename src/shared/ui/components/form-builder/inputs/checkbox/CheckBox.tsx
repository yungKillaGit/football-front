import { Checkbox } from '@mui/material';
import { FieldComponentProps } from '@ui';
import { ChangeEvent } from 'react';

const CheckBox = ({ field, className, disabled }: FieldComponentProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    field.onChange(checked);
  };
  return (
    <Checkbox
      {...field}
      className={className}
      onChange={handleChange}
      disabled={disabled && !field.value}
      checked={field.value}
    />
  );
};

export default CheckBox;
