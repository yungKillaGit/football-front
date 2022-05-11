import { reflect } from '@effector/reflect';
import { Box, Grid, Typography } from '@mui/material';
import { ColumnConfig, TableActionsProps } from '@types';
import {
  Button, confirm, DataTable,
} from '@ui';
import { MAX_TEAM_PLAYERS_NUMBER } from '../../../config';
import { savePlayerModal } from '../../model/save-player';
import { teamPlayersModel, PlayerInfo } from '../../model/team-players';
import SavePlayerModal from './SavePlayerModal';

interface Props {
  currentPlayers: PlayerInfo[];
  areEnoughPlayers: boolean;
}

const tableColumns: ColumnConfig[] = [
  {
    accessor: 'displayId',
    label: 'Number',
  },
  {
    accessor: 'name',
    label: 'Name',
    render: ({ row }) => {
      if (row.firstName) {
        return `${row.lastName} ${row.firstName}`;
      }
      return row.lastName;
    },
  },
  {
    accessor: 'position.name',
    label: 'Position',
  },
];

const TeamPlayersActions = ({ currentPlayers, areEnoughPlayers }: Props) => {
  const openSavePlayerModal = () => {
    savePlayerModal.opened();
  };

  const handleEdit = ({ row }: TableActionsProps<PlayerInfo>) => {
    savePlayerModal.opened({
      data: row.displayId,
    });
  };

  const handleDelete = async ({ row }: TableActionsProps<PlayerInfo>) => {
    confirm({}).then(() => {
      teamPlayersModel.events.playerDeleted(row);
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ mb: 2 }}>
        {`Players ${currentPlayers.length}/${MAX_TEAM_PLAYERS_NUMBER}`}
      </Typography>
      <Grid container columnSpacing={2}>
        <SavePlayerModal />
        <Grid item xs={9}>
          <DataTable
            data={currentPlayers}
            columns={tableColumns}
            sx={{ maxHeight: 400 }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Grid>
        <Grid item xs={3}>
          <Button onClick={openSavePlayerModal} disabled={areEnoughPlayers}>Add</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default reflect({
  view: TeamPlayersActions,
  bind: { currentPlayers: teamPlayersModel.$teamPlayersList },
});
