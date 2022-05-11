import { FC } from 'react';
import ModalContainer, { ModalContainerProps, ModalContentProps } from './ModalContainer';

type Options = Omit<ModalContainerProps, 'ModalContent'>;

export const withModal = <ModalData extends unknown = number>({
  ...rest
}: Options) => {
  return (ModalContent: FC<ModalContentProps<ModalData>>) => () => {
    return (
      <ModalContainer
        {...rest}
        ModalContent={ModalContent}
      />
    );
  };
};
