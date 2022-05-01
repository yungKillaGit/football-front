import { ChangeEventHandler } from 'react';

export interface InputConfig {
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
}

export interface CommonInputProps {
  input: InputConfig;
  className?: string;
}
