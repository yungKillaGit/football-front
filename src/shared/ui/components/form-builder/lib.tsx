import React, { FC } from 'react';

export function prepareInput<Props>(Component: FC<Props>) {
  return function Wrapper(props: Omit<Props, 'input'>) {
    const elementProps: Props = Object.assign(
      props,
    );
    return <Component {...elementProps} />;
  };
}
