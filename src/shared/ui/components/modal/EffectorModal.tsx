import { FC } from 'react';
import {
  Event, sample,
} from 'effector';
import ModalContainer, { ModalContainerProps } from './ModalContainer';
import { ModalModel } from './model';

type Options<ModalProps> = Omit<ModalContainerProps<ModalProps>, 'ModalContent'> & {
  View: FC<ModalProps>;
  onInit?: (modalModel: ModalModel) => Event<any>;
};

export const EffectorModal = <ModalProps extends {}>({
  View,
  modal,
  onInit,
  ...rest
}: Options<ModalProps>) => {
  console.log(modal, 'modal');
  if (onInit) {
    console.log('init');
    sample({
      clock: onInit(modal),
      target: modal.initialized,
    });
  } else {
    modal.initialized();
  }

  return function Wrapper(modalComponentProps: any = {}) {
    return (
      <ModalContainer
        {...rest}
        ModalContent={View}
        modal={modal}
        modalComponentProps={modalComponentProps}
      />
    );
  };
};
