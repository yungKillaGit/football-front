import { isNumberOrString } from '@lib';
import { ModalModel } from '@ui';
import { createStore, sample, Store } from 'effector';
import { useStore } from 'effector-react';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Modal from './Modal';

export interface ModalContentProps<T extends unknown = number> {
  modalData: T | null;
}

export interface ModalContainerProps<ModalProps> {
  routing?: boolean;
  getTitle?: <T>(modalData?: T) => string;
  ModalContent: FC<ModalProps>;
  modal: ModalModel;
  $modalProps?: Store<ModalProps>;
}

function ModalContainer<ModalProps>({
  getTitle = () => '',
  ModalContent,
  routing = true,
  modal,
  $modalProps,
}: ModalContainerProps<ModalProps>) {
  const modalState = useStore(modal.$modal);

  const {
    data, open, name, loading,
  } = modalState;

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

  const modalProps = useStore($modalProps || createStore({} as ModalProps));

  if (loading || !open) {
    return null;
  }

  return (
    <Modal
      open={open}
      title={getTitle(modalData)}
      onClose={onClose}
    >
      <ModalContent {...modalProps} />
    </Modal>
  );
}

export default ModalContainer;
