import { TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { FieldComponentProps } from '../../types';

const Text = ({ field, className, fullWidth }: FieldComponentProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
  };
  return (
    <TextField
      {...field}
      className={className}
      fullWidth={fullWidth}
      onChange={handleChange}
    />
  );
};

export default Text;
