import { muiTheme } from '@lib';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { confirmable, ReactConfirmProps } from 'react-confirm';
import Button from '../button';
import Modal from './Modal';

const ConfirmDialog = ({
  show,
  proceed,
  confirmation = 'Are you sure?',
  dismiss,
}: ReactConfirmProps) => {
  const handleClose = () => {
    dismiss();
  };

  const handleConfirm = () => {
    proceed();
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Modal open={show} onClose={handleClose}>
        <Typography variant="h5">
          {confirmation}
        </Typography>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <Button onClick={handleClose} variant="outlined">Cancel</Button>
          <Button onClick={handleConfirm} sx={{ ml: 1 }}>OK</Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default confirmable(ConfirmDialog);
