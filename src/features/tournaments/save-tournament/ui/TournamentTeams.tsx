import { Team } from '@api';
import { teamsModel } from '@entities/teams';
import {
  BaseFieldConfig,
  CellRendererProps,
  CheckBoxInput,
  ColumnConfig,
  DataTable,
} from '@ui';
import { useStore } from 'effector-react';
import { memo } from 'react';
import { saveTournamentModel } from '../model/save-tournament';

const TournamentTeams = () => {
  const allTeams = useStore(teamsModel.$entitiesList);
  const currentTeams = useStore(saveTournamentModel.$tournamentTeams);

  const addTeamToTournament = (row: Team) => (value: boolean) => {
    saveTournamentModel.events.teamParticipationChanged({
      id: row.id,
      selected: value,
    });
  };

  const TeamParticipation = memo(({ row }: CellRendererProps<any, Team>) => {
    const field: BaseFieldConfig = {
      value: currentTeams.includes(row.id),
      onChange: addTeamToTournament(row),
    };
    return (
      <CheckBoxInput field={field} />
    );
  });

  const columns: ColumnConfig[] = [
    {
      accessor: 'id',
      label: 'Participation',
      render: TeamParticipation,
    },
    {
      accessor: 'name',
      label: 'Team',
    },
  ];

  return (
    <DataTable data={allTeams} columns={columns} />
  );
};

export default TournamentTeams;
