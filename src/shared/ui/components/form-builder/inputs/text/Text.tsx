import { TextField } from '@mui/material';
import { FieldComponentProps } from '../../types';

const Text = ({ input, className }: FieldComponentProps) => {
  return (
    <TextField {...input} className={className} />
  );
};

export default Text;
