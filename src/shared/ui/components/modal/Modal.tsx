import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({
  title,
  children,
  open,
  onClose,
}: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} scroll="body">
      {
        title ? (
          <DialogTitle>{title}</DialogTitle>
        ) : null
      }
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
