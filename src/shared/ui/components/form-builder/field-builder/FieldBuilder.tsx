import { Field, useField } from 'effector-forms';
import { ChangeEvent, FunctionComponent } from 'react';
import FormField from '../form-field';
import { CommonInputProps } from '../types';

export interface FieldBuilderProps {
  field: Field<any>;
  FieldRenderer: FunctionComponent<CommonInputProps>;
}

const FieldBuilder = ({ field, FieldRenderer }: FieldBuilderProps) => {
  const connectedField = useField(field);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    return connectedField.onChange(e.target.value);
  };

  const input = {
    value: connectedField.value,
    onChange,
  };

  return (
    <FormField>
      <FieldRenderer input={input} />
    </FormField>
  );
};

export default FieldBuilder;
