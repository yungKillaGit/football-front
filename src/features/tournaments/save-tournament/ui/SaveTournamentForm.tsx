import { Tournament } from '@api';
import { Box, Grid } from '@mui/material';
import { FormBuilder, SubmitForm } from '@ui';
import { useForm } from 'react-hook-form';
import { SaveTournamentFormValues, saveTournamentModel } from '../model/save-tournament';
import TournamentTeams from './TournamentTeams';

interface Props {
  tournament?: Tournament;
}

const SaveTournamentForm = ({ tournament }: Props) => {
  const form = useForm<SaveTournamentFormValues>({
    mode: 'onChange',
    defaultValues: tournament || {},
  });

  return (
    <SubmitForm form={form} formModel={saveTournamentModel}>
      <FormBuilder.Text name="name" label="Tournament name" />
      <Grid container spacing={2}>
        <Grid item>
          <FormBuilder.Date name="startDate" label="Start date" />
        </Grid>
        <Grid item>
          <FormBuilder.Date name="endDate" label="End date" />
        </Grid>
      </Grid>
      <Box mt={2}>
        <TournamentTeams />
      </Box>
    </SubmitForm>
  );
};

export default SaveTournamentForm;
