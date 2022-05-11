import { Team } from '@api';
import { FlagsSelect } from '@entities/flags';
import { RegionsSelect } from '@entities/regions';
import { Box, Grid } from '@mui/material';
import {
  FormBuilder, SubmitForm,
} from '@ui';
import { useStore } from 'effector-react';
import { useForm } from 'react-hook-form';
import { MAX_TEAM_PLAYERS_NUMBER } from '../../../config';
import { SaveTeamFormValues, saveTeamModel } from '../../model/save-team';
import { teamPlayersModel } from '../../model/team-players';
import TeamPlayersActions from './TeamPlayersActions';

interface Props {
  currentTeam: Team | null;
}

const SaveTeamForm = ({ currentTeam }: Props) => {
  const saveTeamForm = useForm<SaveTeamFormValues>({
    mode: 'onChange',
    defaultValues: currentTeam || {},
  });

  const areEnoughPlayers = useStore(teamPlayersModel.$teamPlayersList).length === MAX_TEAM_PLAYERS_NUMBER;

  return (
    <SubmitForm form={saveTeamForm} formModel={saveTeamModel} canSubmit={areEnoughPlayers}>
      <Grid container>
        <Grid item xs={9}>
          <FormBuilder.Text
            name="name"
            label="Team name"
            fullWidth
            rules={{
              required: true,
            }}
          />
        </Grid>
        <Grid container item>
          <Grid container item xs={9} sx={{ justifyContent: 'space-between' }}>
            <FormBuilder.Text
              name="countryCode"
              label="Country Code"
              fullWidth
              rules={{
                required: true,
                validate: (value: string) => value.length === 3,
              }}
            />
            <RegionsSelect
              name="region"
              label="Region"
              firstOptionSelected
            />
            <FlagsSelect
              name="flag"
              label="Flag"
            />
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3 }}>
        <TeamPlayersActions areEnoughPlayers={areEnoughPlayers} />
      </Box>
    </SubmitForm>
  );
};

export default SaveTeamForm;
