export interface ChangeEvent<T = {
  value: string;
  name: string;
}> {
  target: T;
}

export type BaseEventHandler = (event: ChangeEvent) => void;

export interface InputConfig {
  value: any;
  onChange: BaseEventHandler;
  id: string;
}

export interface FieldComponentProps {
  input: InputConfig;
  className?: string;
}
