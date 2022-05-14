import { Team } from '@api';
import { teamsModel } from '@entities/teams';
import { Typography } from '@mui/material';
import {
  BaseFieldConfig,
  CellRendererProps,
  CheckBoxInput,
  ColumnConfig,
  DataTable,
} from '@ui';
import { useStore } from 'effector-react';
import { MAX_TOURNAMENT_TEAMS_NUMBER } from '../config';
import { tournamentTeamsModel } from '../model/tournament-teams';

const TeamParticipation = (currentTeams: number[], onChange: (row: Team) => (value: boolean) => void) => {
  return ({ row }: CellRendererProps<any, Team>) => {
    const checked = currentTeams.includes(row.id);
    const field: BaseFieldConfig = {
      value: checked,
      onChange: onChange(row),
    };
    return (
      <CheckBoxInput
        field={field}
        disabled={currentTeams.length === MAX_TOURNAMENT_TEAMS_NUMBER}
      />
    );
  };
};

const TournamentTeams = () => {
  const allTeams = useStore(teamsModel.$entitiesList);
  const currentTeams = useStore(tournamentTeamsModel.$tournamentTeams);

  const addTeamToTournament = (row: Team) => (value: boolean) => {
    tournamentTeamsModel.events.teamParticipationChanged({
      id: row.id,
      selected: value,
    });
  };

  const columns: ColumnConfig[] = [
    {
      accessor: 'id',
      label: 'Participation',
      render: TeamParticipation(currentTeams, addTeamToTournament),
      sx: { width: 150 },
    },
    {
      accessor: 'name',
      label: 'Team',
    },
  ];

  return (
    <div>
      <Typography sx={{ mb: 2 }}>
        {`Teams ${currentTeams.length}/${MAX_TOURNAMENT_TEAMS_NUMBER}`}
      </Typography>
      <DataTable
        data={allTeams}
        columns={columns}
        sx={{ height: 450 }}
      />
    </div>
  );
};

export default TournamentTeams;
