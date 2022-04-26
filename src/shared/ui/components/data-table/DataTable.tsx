import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

import { ColumnConfig } from 'shared/types/data-table';

interface Props<T = Record<string, any>> {
  columns: ColumnConfig[];
  data: T[];
}

const DataTable = ({ columns, data }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, minHeight: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              columns.map((column) => (
                <TableCell key={column.accessor}>
                  <Typography variant="h5">
                    {column.label}
                  </Typography>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={row.id || rowIndex}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {
                columns.map((column, columnIndex) => (
                  <TableCell key={`${column.accessor}-${rowIndex}-${columnIndex}`}>
                    {column.render ? column.render({ value: row[column.accessor] }) : row[column.accessor]}
                  </TableCell>
                ))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(DataTable);
