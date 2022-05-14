import { bem } from '@lib';
import { get } from 'lodash';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import { DataTableProps } from './types';
import TableDefaultActions from './TableDefaultActions';
import './DataTable.scss';

const { block, element } = bem('DataTable');

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  Actions,
  className = '',
  sx,
  onRowClick,
  onEdit,
  onDelete,
}: DataTableProps<T>) => {
  const handleRowClick = (row: T) => (event: any) => {
    // TODO Add rows multi select.
    if (onRowClick && event.target.localName !== 'button') {
      onRowClick({ row });
    }
  };

  const actionCallbacksExist = onEdit && onDelete;
  const needRenderActionsColumn = !!Actions || actionCallbacksExist;

  return (
    <TableContainer
      component={Paper}
      sx={{
        minHeight: 400,
        ...sx,
      }}
      {...block({}, className)}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {
              columns.map((column) => (
                <TableCell key={column.accessor} sx={column.sx}>
                  <Typography variant="body1">
                    {column.label}
                  </Typography>
                </TableCell>
              ))
            }
            {
              needRenderActionsColumn ? (
                <TableCell key="actions" {...element('cell', { actions: true })}>
                  <Typography variant="body1" />
                </TableCell>
              ) : null
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={row.id || rowIndex}
              hover
              onClick={handleRowClick(row)}
              {...element('row', { clickable: Boolean(onRowClick) })}
            >
              {
                columns.map((column, columnIndex) => (
                  <TableCell key={`${column.accessor}-${rowIndex}-${columnIndex}`} sx={column.sx}>
                    {
                      column.render
                        ? column.render({ value: get(row, column.accessor), row })
                        : get(row, column.accessor)
                    }
                  </TableCell>
                ))
              }
              {
                needRenderActionsColumn ? (
                  Actions ? (
                    <TableCell key={`actions-${rowIndex}`} {...element('cell', { sticky: true })}>
                      <Actions row={row} />
                    </TableCell>
                  ) : actionCallbacksExist ? (
                    <TableCell {...element('cell', { actions: true })}>
                      <TableDefaultActions
                        row={row}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </TableCell>
                  ) : null
                ) : null
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
