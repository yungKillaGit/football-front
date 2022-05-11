import { ReactNode } from 'react';

export interface CellRendererProps<TValue = any> {
  value: TValue;
  row: Record<string, any>;
}

export interface TableActionsProps<T = Record<string, any>> {
  row: T;
}

export type TableActionHandler<T = Record<string, any>> = (props: TableActionsProps<T>) => void;

export interface ColumnConfig {
  accessor: string;
  label?: string;
  render?: (props: CellRendererProps) => ReactNode;
}
