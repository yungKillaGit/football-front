import { bem } from '@lib';
import { Typography } from '@mui/material';
import React from 'react';
import './FormField.scss';
import { FormFieldProps } from '../types';

const { block, element } = bem('FormField');

function FormField<FieldValue>({
  field,
  label,
  fullWidth,
  children,
}: FormFieldProps<FieldValue>) {
  return (
    <div {...block({ fullWidth })}>
      {
        label ? (
          <label htmlFor={field.id} {...element('label')}>
            <Typography variant="body2">
              {label}
            </Typography>
          </label>
        ) : null
      }
      <div {...element('input-container', { withLabel: Boolean(label) })}>
        {children}
      </div>
    </div>
  );
}

export default FormField;
