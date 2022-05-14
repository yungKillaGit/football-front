import { ReactNode } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

export interface BaseFieldConfig {
  onChange: (value: any) => void;
  value: any;
}

export interface FieldConfig extends BaseFieldConfig {
  id: string;
}

export interface InputConfig extends Partial<ControllerRenderProps> {}

export interface FieldComponentProps<ValueType = string> {
  field: FieldConfig | BaseFieldConfig;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export interface FormFieldProps<FieldValue = any> {
  label?: string;
  children: ReactNode;
  fullWidth?: boolean;
  field: FieldConfig;
}
