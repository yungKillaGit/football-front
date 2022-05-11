import { PlayerPositionsSelect } from '@entities/player-positions';
import { FormBuilder, SubmitForm } from '@ui';
import { useGate } from 'effector-react';
import { useForm } from 'react-hook-form';
import { CurrentPlayerGate, SavePlayerFormValues, savePlayerModel } from '../../model/save-player';
import { PlayerInfo } from '../../model/team-players';

interface Props {
  currentPlayer: PlayerInfo | null;
}

const SavePlayerForm = ({ currentPlayer }: Props) => {
  const savePlayerForm = useForm<SavePlayerFormValues>({
    mode: 'onChange',
    defaultValues: currentPlayer || {},
  });
  useGate(CurrentPlayerGate, currentPlayer);

  return (
    <SubmitForm form={savePlayerForm} formModel={savePlayerModel}>
      <FormBuilder.Text
        name="lastName"
        label="Last name"
        fullWidth
        rules={{ required: true }}
      />
      <FormBuilder.Text
        name="firstName"
        label="First name"
        fullWidth
      />
      <PlayerPositionsSelect name="position" label="Position" fullWidth />
      <FormBuilder.Text
        name="shirtNumber"
        label="Shirt number"
        fullWidth
        rules={{
          required: true,
          min: 1,
          max: 99,
          pattern: /^\d+$/,
        }}
      />
      <FormBuilder.Date
        name="birthDate"
        label="Date of birth"
        fullWidth
        rules={{ required: true }}
      />
    </SubmitForm>
  );
};

export default SavePlayerForm;
