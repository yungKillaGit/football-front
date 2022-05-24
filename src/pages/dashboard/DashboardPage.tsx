import { Tournament } from '@api';
import { reflect } from '@effector/reflect';
import { tournamentsModel, TournamentsSelect } from '@entities/tournaments';
import GroupTeamsTable from '@features/allocate-teams/ui/GroupTeamsTable';
import { dashboardModel } from '@features/dashboard';
import { Box, Grid } from '@mui/material';
import { BaseFieldConfig } from '@ui';
import { groupBy } from 'lodash';
import { useEffect, useState } from 'react';

interface Props {
  tournamentsById: Record<number, Tournament>;
  tournamentsList: Tournament[];
  selectedTournament: Tournament | null;
}

const DashboardPage = ({ tournamentsById, selectedTournament, tournamentsList }: Props) => {
  const handleChange = (value: number) => {
    dashboardModel.selectedTournamentChanged(tournamentsById[value]);
  };

  const field: BaseFieldConfig = {
    value: selectedTournament?.id || '',
    onChange: handleChange,
  };

  const [groupGames, setGroupGames] = useState();

  useEffect(() => {
    if (selectedTournament) {
      const groupStage = selectedTournament.tournamentStages[0];
      const gamesByGroup = groupBy(groupStage.games, (x) => {
        return x.homeTeam.groupId;
      });
    }
  }, [selectedTournament]);

  const groups = ['A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TournamentsSelect field={field} tournamentsList={tournamentsList} />
      <Grid item xs={12} sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }} container spacing={2}>
        {
          Array.from(Array(6), (_, i) => i + 1).map((x) => {
            return (
              <Grid item sx={{ width: 'calc(100% / 3)' }}>
                <Box>
                  {`Group ${groups[x - 1]}`}
                </Box>
                <Box sx={{ background: 'lightgray', height: 280 }} />
              </Grid>
            );
          })
        }
      </Grid>
    </Box>
  );
};

export default reflect({
  view: DashboardPage,
  bind: {
    tournamentsById: tournamentsModel.$entitiesById,
    tournamentsList: tournamentsModel.$entitiesList,
    selectedTournament: dashboardModel.$selectedTournament,
  },
  hooks: {
    mounted: tournamentsModel.effects.getManyFx.prepend(() => ({
      query: {
        join: [
          {
            relation: 'tournamentGroups',
          },
          {
            relation: 'tournamentStages',
          },
          {
            relation: 'tournamentStages.games',
          },
          {
            relation: 'tournamentStages.games.homeTeam',
          },
          {
            relation: 'tournamentStages.games.awayTeam',
          },
        ],
      },
    })),
  },
});
