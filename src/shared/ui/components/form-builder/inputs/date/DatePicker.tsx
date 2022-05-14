import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { FieldComponentProps } from '../../types';
import DatePickerInput from './DatePickerInput';

const DatePicker = ({ field: { onChange, value, ...inputConfig } }: FieldComponentProps<Date | null>) => {
  const handleChange = (date: Date | null) => {
    onChange(date);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        renderInput={(params) => {
          return (
            <DatePickerInput {...params} />
          );
        }}
        onChange={handleChange}
        {...inputConfig}
        value={value || null}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
