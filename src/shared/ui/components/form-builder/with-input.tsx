import { Field, useField } from 'effector-forms';
import { uniqueId } from 'lodash';
import { FunctionComponent } from 'react';
import FormField from './form-field';
import { ChangeEvent, FieldComponentProps, InputConfig } from './types';

interface InjectedProps {
  field: Field<any>;
  label?: string;
}

type WrapperProps<WrappedComponentProps> = InjectedProps & Omit<WrappedComponentProps, 'input'>;

export function withInput<WrappedComponentProps extends FieldComponentProps = FieldComponentProps>(Component: FunctionComponent<WrappedComponentProps>) {
  return ({ field, label, ...rest }: WrapperProps<WrappedComponentProps>) => {
    const connectedField = useField(field);

    const onChange = (e: ChangeEvent) => {
      return connectedField.onChange(e.target.value);
    };

    const input: InputConfig = {
      value: connectedField.value,
      onChange,
      id: uniqueId('form-field-'),
    };

    const componentProps = {
      input,
      ...rest,
    } as unknown as WrappedComponentProps;

    return (
      <FormField label={label} inputId={input.id}>
        <Component {...componentProps} />
      </FormField>
    );
  };
}
