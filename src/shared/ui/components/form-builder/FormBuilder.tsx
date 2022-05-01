import { FunctionComponent } from 'react';
import { CommonInputProps } from 'shared/ui/components/form-builder/types';
import FieldBuilder from './field-builder';
import { FieldBuilderProps } from './field-builder/FieldBuilder';
import { TextInput } from './inputs/text';

const withFieldBuilder = (FieldRenderer: FunctionComponent<CommonInputProps>) => {
  return (props: Omit<FieldBuilderProps, 'FieldRenderer'>) => (
    <FieldBuilder {...props} FieldRenderer={FieldRenderer} />
  );
};

export const FormBuilder = {
  Text: withFieldBuilder(TextInput),
};
