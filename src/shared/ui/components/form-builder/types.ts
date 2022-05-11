import { ReactNode } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

export interface FieldConfig extends ControllerRenderProps {
  id: string;
}

export interface FieldComponentProps<ValueType = string> {
  field: FieldConfig;
  className?: string;
  fullWidth?: boolean;
}

export interface FormFieldProps<FieldValue = any> {
  label?: string;
  children: ReactNode;
  fullWidth?: boolean;
  field: FieldConfig;
}
