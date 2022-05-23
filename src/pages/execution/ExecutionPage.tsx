import { Tournament } from '@api';
import { reflect } from '@effector/reflect';
import { tournamentsModel } from '@entities/tournaments';
import { AllocateTeamsButton } from '@features/allocate-teams';
import { dashboardModel } from '@features/dashboard';
import { Box, Grid } from '@mui/material';
import { Button } from '@ui';
import { attach } from 'effector';
import { ReactNode } from 'react';

interface Props {
  tournamentsById: Record<number, Tournament>;
  selectedTournament: Tournament | null;
}

interface RowProps {
  children: ReactNode;
  preCondition?: boolean;
  text?: string;
}

const Row = ({ children, preCondition = false, text }: RowProps) => {
  return (
    <Grid container>
      <Grid item xs={8}>
        {children}
      </Grid>
      <Grid
        item
        sx={{
          alignItems: 'center', display: 'flex', justifyContent: 'center', width: 200,
        }}
      >
        {
          text || (preCondition ? 'Yes' : 'No')
        }
      </Grid>
    </Grid>
  );
};

const ExecutionPage = ({ tournamentsById, selectedTournament }: Props) => {
  if (tournamentsById && selectedTournament) {
    const tournament = tournamentsById[selectedTournament.id];
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 600 }}>
        <Row text="Teams allocated">
          {null}
        </Row>
        <Row preCondition={tournament.ready}>
          <AllocateTeamsButton tournament={tournament} />
        </Row>
      </Box>
    );
  }
  return (
    <div>
      Please, select tournament on dashboard page
    </div>
  );
};

export default reflect({
  view: ExecutionPage,
  bind: {
    tournamentsById: tournamentsModel.$entitiesById,
    selectedTournament: dashboardModel.$selectedTournament,
  },
  hooks: {
    mounted: attach({
      source: dashboardModel.$selectedTournament,
      effect: (selectedTournament) => {
        if (selectedTournament) {
          return tournamentsModel.effects.getOneFx({
            payload: { id: selectedTournament.id },
            query: {
              join: [
                {
                  relation: 'tournamentGroups',
                },
                {
                  relation: 'teams',
                },
              ],
            },
          });
        }
        return {};
      },
    }),
  },
});
