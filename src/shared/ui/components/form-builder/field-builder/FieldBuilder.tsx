import { bem } from '@lib';
import { Typography } from '@mui/material';
import { Field, useField } from 'effector-forms';
import { uniqueId } from 'lodash';
import { ChangeEvent, FunctionComponent } from 'react';
import { CommonInputProps } from '../types';
import './FieldBuilder.scss';

export interface FieldBuilderProps {
  field: Field<any>;
  FieldRenderer: FunctionComponent<CommonInputProps>;
  label?: string;
}

const { block, element } = bem('FieldBuilder');

const FieldBuilder = ({ field, FieldRenderer, label }: FieldBuilderProps) => {
  const connectedField = useField(field);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    return connectedField.onChange(e.target.value);
  };

  const input = {
    value: connectedField.value,
    onChange,
    id: uniqueId('form-field-'),
  };

  return (
    <div {...block()}>
      {
        label ? (
          <label htmlFor={input.id} {...element('label')}>
            <Typography variant="caption">
              {label}
            </Typography>
          </label>
        ) : null
      }
      <FieldRenderer
        input={input}
        {...element('input', { withLabel: label ? 'left' : false })}
      />
    </div>
  );
};

export default FieldBuilder;
