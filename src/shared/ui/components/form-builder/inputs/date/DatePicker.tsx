import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { ChangeEvent, useState } from 'react';
import ruLocale from 'date-fns/locale/ru';

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
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
      <MuiDatePicker
        mask="__.__.____"
        renderInput={(params) => {
          return (
            <DatePickerInput
              {...params}
            />
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
