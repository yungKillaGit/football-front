import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

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
  routing?: boolean;
}

const defaultModalConfig = {
  open: false,
};

const ModalContainer = ({
  name,
  title,
  children,
  routing = true,
}: ModalContainerProps) => {
  const modalConfig = modalsModel.selectors.useModalConfig(name) || defaultModalConfig;

  const onClose = () => {
    modalsModel.events.modalClosed({ name });
  };

  const [modalSearchParams, setModalSearchParams] = useSearchParams();
  useEffect(() => {
    if (routing) {
      modalsModel.events.modalOpened.watch(() => {
        setModalSearchParams({ modal: name });
      });
      modalsModel.events.modalClosed.watch(() => {
        setModalSearchParams({});
      });

      const modalInUrl = modalSearchParams.get('modal');
      if (modalInUrl && modalInUrl === name) {
        modalsModel.events.modalOpened({ name });
      }
    }
  }, [modalSearchParams, name, routing, setModalSearchParams]);

  return (
    <Modal open={modalConfig.open} title={title} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default ModalContainer;
