import { TournamentStage } from '@api';
import { Box, Grid } from '@mui/material';

interface Props {
  stage: TournamentStage;
}

interface RowProps {
  game: string;
  result: string;
}

const Row = ({ game, result }: RowProps) => {
  return (
    <Grid container item>
      <Grid item xs={8}>
        {game}
      </Grid>
      <Grid item xs={4}>
        {result}
      </Grid>
    </Grid>
  );
};

const StageGames = ({ stage }: Props) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Row game="Game" result="Result" />
      {
        stage.games.map((x) => {
          return (
            <Row
              game={`${x.homeTeam.team.name} - ${x.awayTeam.team.name}`}
              result={`${x.homeTeamPoints} - ${x.awayTeamPoints}`}
            />
          );
        })
      }
    </Box>
  );
};

export default StageGames;
