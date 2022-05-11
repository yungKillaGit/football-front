import { Team } from '@api';
import { teamsModel, teamsPage, TeamsTable } from '@entities/teams';
import { saveTeamModal, Teams } from '@features/teams';
import { Box } from '@mui/material';
import { variant } from '@effector/reflect';
import { TableActionsProps } from '@types';
import { confirm } from '@ui';
import { combine } from 'effector';

interface Props {
  teams: Team[];
}

const TeamsPage = ({ teams }: Props) => {
  const onTeamRowClick = ({ row }: TableActionsProps<Team>) => {
    saveTeamModal.opened({
      data: row.id,
    });
  };

  const onDelete = ({ row }: TableActionsProps<Team>) => {
    confirm({}).then(() => {
      teamsModel.events.teamDeleted({ id: row.id });
    });
  };

  return (
    <div>
      <Teams.Actions.SaveTeamModal />
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Teams.Actions.AddTeamButton />
      </Box>
      <TeamsTable
        teams={teams}
        onRowClick={onTeamRowClick}
        onEdit={onTeamRowClick}
        onDelete={onDelete}
      />
    </div>
  );
};

export default variant({
  source: combine({
    loading: teamsModel.$teamsLoading,
  }, ({
    loading,
  }) => {
    if (loading) {
      return 'loading';
    }
    return 'ready';
  }),
  cases: {
    loading: () => null,
    ready: TeamsPage,
  },
  bind: { teams: teamsModel.$teamsList },
  hooks: {
    mounted: teamsModel.effects.getTeamsFx,
    unmounted: teamsPage.unmounted,
  },
});
