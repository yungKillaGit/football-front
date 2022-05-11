import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { FieldComponentProps } from '../../types';

const DatePicker = ({ field: { onChange, value, ...inputConfig } }: FieldComponentProps<Date | null>) => {
  const handleChange = (date: Date | null) => {
    onChange(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        renderInput={(params) => <TextField {...params} />}
        onChange={handleChange}
        {...inputConfig}
        value={value || null}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
