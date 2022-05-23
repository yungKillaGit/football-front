import { Team, TournamentGroup } from '@api';
import { Box, Typography } from '@mui/material';
import { ColumnConfig, DataTable } from '@ui';
import { useMemo } from 'react';

const columns: ColumnConfig[] = [
  {
    label: 'Shortname',
    accessor: 'shortName',
    sx: {
      width: '30%',
    },
  },
  {
    label: 'Team',
    accessor: 'name',
    sx: {
      width: '70%',
    },
  },
];

interface Props {
  teams: Team[];
  group: TournamentGroup;
}

const GroupTeamsTable = ({ teams, group }: Props) => {
  const mappedTeams = useMemo(() => {
    return teams.map((x, index) => ({
      ...x,
      shortName: `${group.name}${index + 1}`,
    }));
  }, [group.name, teams]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ mb: 2 }}>
        {`Group ${group.name}`}
      </Typography>
      <DataTable columns={columns} data={mappedTeams} sx={{ minHeight: 'unset' }} />
    </Box>
  );
};

export default GroupTeamsTable;
