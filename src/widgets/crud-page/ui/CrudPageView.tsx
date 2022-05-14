import { BaseModel } from '@api';
import { Box } from '@mui/material';
import {
  Button, confirm, DataTable, TableActionsProps,
} from '@ui';
import { useStore } from 'effector-react';
import { CrudPageOptions } from '../lib';

interface CrudPageProps<Entity extends BaseModel, CreateDto, UpdateDto> extends CrudPageOptions<Entity, CreateDto, UpdateDto> {
}

const CrudPageView = <Entity extends BaseModel, CreateDto, UpdateDto>({
  resourceModel,
  renderModal,
  tableColumns,
  modal,
}: CrudPageProps<Entity, CreateDto, UpdateDto>) => {
  const data = useStore(resourceModel.$entitiesList);

  const openAddForm = () => {
    modal.opened();
  };

  const openEditForm = ({ row }: TableActionsProps<Entity>) => {
    modal.opened({
      data: row.id,
    });
  };

  const handleDelete = ({ row }: TableActionsProps<Entity>) => {
    confirm({}).then(() => {
      resourceModel.events.entityDeleted({ payload: { id: row.id } });
    });
  };

  return (
    <div>
      {renderModal()}
      <Box sx={{ display: 'flex', mb: 3, justifyContent: 'end' }}>
        <Button onClick={openAddForm}>
          Add
        </Button>
      </Box>
      <DataTable<Entity>
        data={data}
        columns={tableColumns}
        onRowClick={openEditForm}
        onEdit={openEditForm}
        onDelete={handleDelete}
        sx={{ height: 600 }}
      />
    </div>
  );
};

export default CrudPageView;
