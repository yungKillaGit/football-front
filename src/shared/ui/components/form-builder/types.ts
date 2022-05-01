import { ChangeEventHandler } from 'react';

export interface InputConfig {
  value: any;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export interface CommonInputProps {
  input: InputConfig;
}
