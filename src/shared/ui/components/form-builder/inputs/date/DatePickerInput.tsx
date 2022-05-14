import { TextField, TextFieldProps } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';

const DatePickerInput = (textFieldProps: TextFieldProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <TextField
      {...textFieldProps}
    />
  );
};

export default forwardRef(DatePickerInput);
