import { isNumberOrString } from '@lib';
import { ModalInstance } from '@ui';
import { sample } from 'effector';
import { useStore } from 'effector-react';
import { FC, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import Modal from './Modal';

export interface ModalContentProps<T extends unknown = number> {
  modalData: T | null;
}

export interface ModalContainerProps {
  routing?: boolean;
  getTitle?: <T>(modalData?: T) => string;
  ModalContent: FC<any>;
  modal: ModalInstance;
}

function ModalContainer({
  getTitle = () => '',
  ModalContent,
  routing = true,
  modal,
}: ModalContainerProps) {
  const {
    data, open, name, loading,
  } = useStore(modal.$modal);

  const [modalSearchParams, setModalSearchParams] = useSearchParams();

  const onClose = () => {
    modal.closed();
    setModalSearchParams({});
  };

  const modalData = routing ? data || modalSearchParams.get('data') : data;

  useEffect(() => {
    sample({
      clock: modal.closed,
      fn: () => {
        setModalSearchParams({});
      },
    });
  }, [modal.closed, setModalSearchParams]);

  useEffect(() => {
    if (routing) {
      const modalInUrl = modalSearchParams.get('modal');
      const dataParam = modalSearchParams.get('data');
      if (modalInUrl && modalInUrl === name && !open) {
        modal.opened({
          data: dataParam,
        });
      }

      if (open && !modalInUrl) {
        const searchParams: Record<string, string> = { modal: name };
        if (data && isNumberOrString(data)) {
          searchParams.data = data as string;
        }
        setModalSearchParams(searchParams);
      }
    }
  }, [data, modal, modalSearchParams, name, open, routing, setModalSearchParams]);

  if (loading || !open) {
    return null;
  }

  return (
    <Modal
      open={open}
      title={getTitle(modalData)}
      onClose={onClose}
    >
      <ModalContent modalData={modalData} />
    </Modal>
  );
}

export default ModalContainer;
