import { Tournament } from '@api';
import { FormBuilder, SubmitForm } from '@ui';
import { useForm } from 'react-hook-form';
import { SaveTournamentFormValues, saveTournamentModel } from '../model/save-tournament';

interface Props {
  tournament: Tournament | null;
}

const SaveTournamentForm = ({ tournament }: Props) => {
  const form = useForm<SaveTournamentFormValues>({
    mode: 'onChange',
    defaultValues: tournament || {},
  });

  return (
    <SubmitForm form={form} formModel={saveTournamentModel}>
      <FormBuilder.Text name="name" label="Tournament name" />
      <FormBuilder.Date name="startDate" label="Start date" />
      <FormBuilder.Date name="endDate" label="End date" />
    </SubmitForm>
  );
};

export default SaveTournamentForm;
