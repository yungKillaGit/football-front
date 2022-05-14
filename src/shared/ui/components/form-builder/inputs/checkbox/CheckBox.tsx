import { Checkbox } from '@mui/material';
import { FieldComponentProps } from '@ui';

const CheckBox = ({ field, className }: FieldComponentProps) => {
  return (
    <Checkbox {...field} className={className} />
  );
};

export default CheckBox;
