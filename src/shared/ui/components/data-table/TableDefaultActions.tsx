import { Box, Typography } from '@mui/material';
import { TableActionsProps } from '@types';
import { Button } from '@ui';

interface Props<T> {
  onEdit: (props: TableActionsProps<T>) => void;
  onDelete: (props: TableActionsProps<T>) => void;
  row: T;
}

const TableDefaultActions = <T extends Record<string, any>>({ onEdit, onDelete, row }: Props<T>) => {
  const handleEdit = (currentRow: T) => () => {
    onEdit({ row: currentRow });
  };

  const handleDelete = (currentRow: T) => () => {
    onDelete({ row: currentRow });
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <Button onClick={handleEdit(row)} variant="outlined">
        <Typography variant="body2">
          Edit
        </Typography>
      </Button>
      <Button onClick={handleDelete(row)} sx={{ ml: 1 }} variant="outlined">
        <Typography variant="body2">
          Delete
        </Typography>
      </Button>
    </Box>
  );
};

export default TableDefaultActions;
