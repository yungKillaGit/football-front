import { reflect } from '@effector/reflect';
import { teamsModel, TeamsTable } from 'entities/teams';
import { Team } from 'shared/api';

interface Props {
  teams: Team[];
}

const TeamsPage = ({ teams }: Props) => {
  return (
    <TeamsTable teams={teams} />
  );
};

export default reflect({
  view: TeamsPage,
  bind: { teams: teamsModel.$teamsList },
  hooks: {
    mounted: teamsModel.effects.getTeamsFx,
  },
});
