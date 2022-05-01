import { Box } from '@mui/material';
import { reflect } from '@effector/reflect';

import { teamsModel, TeamsTable } from 'entities/teams';
import { Team } from 'shared/api';
import { Teams } from 'features/teams';

interface Props {
  teams: Team[];
}

const TeamsPage = ({ teams }: Props) => {
  return (
    <div>
      <Teams.Actions.SaveTeamModal />
      <Box sx={{ display: 'flex', mb: 2 }}>
        <Teams.Actions.AddTeamButton />
      </Box>
      <TeamsTable teams={teams} />
    </div>
  );
};

export default reflect({
  view: TeamsPage,
  bind: { teams: teamsModel.$teamsList },
  hooks: {
    mounted: teamsModel.effects.getTeamsFx,
  },
});
