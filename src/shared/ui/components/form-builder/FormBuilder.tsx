import { uniqueId } from 'lodash';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import {
  DateInput,
  SelectInput,
  TextInput,
} from './inputs';
import FormField from './form-field';
import { FieldComponentProps, FormFieldProps } from './types';

interface ControllerProps {
  name: string;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

export type FormBuilderProps<InputProps extends FieldComponentProps = FieldComponentProps> = ControllerProps & Omit<FormFieldProps, 'field' | 'children'> & Omit<InputProps, 'field'>;

function create<Props extends FieldComponentProps>(Component: FC<Props>, defaultProps: Partial<FieldComponentProps> = { fullWidth: true }) {
  return function FormBuilder<InputProps extends FieldComponentProps = Props>({
    name, rules, ...rest
  }: FormBuilderProps<Props | InputProps>) {
    const componentProps: Props = Object.assign({ ...defaultProps, ...rest });
    return (
      <Controller
        name={name}
        render={({
          field,
          fieldState,
          formState,
        }) => {
          const extendedField = {
            ...field,
            id: uniqueId('form-field-'),
            value: field.value || '',
          };

          return (
            <FormField
              {...rest}
              field={extendedField}
            >
              <Component {...componentProps} field={extendedField} />
            </FormField>
          );
        }}
        rules={rules}
      />
    );
  };
}

export const FormBuilder = {
  Text: create(TextInput),
  Select: create(SelectInput, { fullWidth: false }),
  Date: create(DateInput),
};
