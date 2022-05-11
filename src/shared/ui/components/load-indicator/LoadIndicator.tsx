import { CircularProgress, SxProps } from '@mui/material';

interface Props {
  sx?: SxProps;
}

const LoadIndicator = ({ sx }: Props) => {
  return (
    <CircularProgress
      color="primary"
      sx={sx}
    />
  );
};

export default LoadIndicator;
