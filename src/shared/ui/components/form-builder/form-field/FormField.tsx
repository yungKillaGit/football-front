import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const FormField = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default FormField;
