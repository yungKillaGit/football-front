import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ReactNode } from 'react';

import { modalsModel } from 'shared/ui';

interface CommonProps {
  title?: string;
  children: ReactNode;
}

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

const Modal = ({
  title,
  children,
  open,
  onClose,
}: ModalProps & CommonProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {
        title ? (
          <DialogTitle>{title}</DialogTitle>
        ) : null
      }
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

interface ModalContainerProps extends CommonProps {
  name: string;
}

const defaultModalConfig = {
  open: false,
};

const ModalContainer = ({ name, title, children }: ModalContainerProps) => {
  const modalConfig = modalsModel.selectors.useModalConfig(name) || defaultModalConfig;

  const onClose = () => {
    modalsModel.events.modalClosed({ name });
  };

  return (
    <Modal open={modalConfig.open} title={title} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default ModalContainer;
