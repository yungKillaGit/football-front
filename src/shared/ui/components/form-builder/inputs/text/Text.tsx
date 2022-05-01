import { TextField } from '@mui/material';
import { CommonInputProps } from '../../types';

const Text = ({ input, className }: CommonInputProps) => {
  return (
    <TextField {...input} className={className} />
  );
};

export default Text;
