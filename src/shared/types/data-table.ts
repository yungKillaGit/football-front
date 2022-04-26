import { ReactNode } from 'react';

export interface CellRendererProps<T = any> {
  value: T;
}

export interface ColumnConfig {
  accessor: string;
  label?: string;
  render?: (props: CellRendererProps) => ReactNode;
}
