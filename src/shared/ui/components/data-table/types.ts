import { SxProps } from '@mui/material';
import { FC, ReactNode } from 'react';

export interface CellRendererProps<Value = any, Row = any> {
  value: Value;
  row: Row;
}

export interface TableActionsProps<T = Record<string, any>> {
  row: T;
}

export type TableActionHandler<T = Record<string, any>> = (props: TableActionsProps<T>) => void;

export interface ColumnConfig {
  accessor: string;
  label?: string;
  render?: (props: CellRendererProps) => ReactNode;
  sx?: SxProps;
}

export interface DataTableProps<Entity> {
  columns: ColumnConfig[];
  data: Entity[];
  Actions?: FC<TableActionsProps<Entity>>;
  className?: string;
  sx?: SxProps;
  onRowClick?: (props: TableActionsProps<Entity>) => void;
  onEdit?: (props: TableActionsProps<Entity>) => void;
  onDelete?: (props: TableActionsProps<Entity>) => void;
}
