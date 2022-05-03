import { bem } from '@lib';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';
import './FormField.scss';

const { block, element } = bem('FormField');

interface Props {
  label?: string;
  children: ReactNode;
  inputId: string;
}

function FormField({ label, children, inputId }: Props) {
  return (
    <div {...block()}>
      {
        label ? (
          <label htmlFor={inputId} {...element('label')}>
            <Typography variant="caption">
              {label}
            </Typography>
          </label>
        ) : null
      }
      <div {...element('input-container', { withLabel: label ? 'left' : false })}>
        {children}
      </div>
    </div>
  );
}

export default FormField;
