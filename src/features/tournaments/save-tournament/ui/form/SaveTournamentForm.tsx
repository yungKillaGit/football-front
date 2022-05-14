import { Tournament } from '@api';
import { bem } from '@lib';
import { Box } from '@mui/material';
import { FormBuilder, SubmitForm } from '@ui';
import { useStore } from 'effector-react';
import { useForm } from 'react-hook-form';
import { MAX_TOURNAMENT_TEAMS_NUMBER } from '../../config';
import { SaveTournamentFormValues, saveTournamentModel } from '../../model/save-tournament';
import { tournamentTeamsModel } from '../../model/tournament-teams';
import TournamentTeams from '../TournamentTeams';
import './SaveTournamentForm.scss';

interface Props {
  tournament?: Tournament;
}

const { block, element } = bem('SaveTournamentForm');

const SaveTournamentForm = ({ tournament }: Props) => {
  const form = useForm<SaveTournamentFormValues>({
    mode: 'onChange',
    defaultValues: tournament || {},
  });

  const canSubmit = useStore(tournamentTeamsModel.$tournamentTeams).length === MAX_TOURNAMENT_TEAMS_NUMBER;

  return (
    <SubmitForm form={form} formModel={saveTournamentModel} canSubmit={canSubmit} {...block()}>
      <FormBuilder.Text name="name" label="Tournament name" rules={{ required: true }} />
      <Box {...element('dates')}>
        <FormBuilder.Date name="startDate" label="Start date" rules={{ required: true }} />
        <FormBuilder.Date name="endDate" label="End date" rules={{ required: true }} />
      </Box>
      <Box mt={2}>
        <TournamentTeams />
      </Box>
    </SubmitForm>
  );
};

export default SaveTournamentForm;
