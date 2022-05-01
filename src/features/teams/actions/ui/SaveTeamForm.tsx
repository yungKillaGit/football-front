import { Grid } from '@mui/material';
import { FormBuilder, SubmitForm } from '@ui';
import { createEffect } from 'effector';
import { createForm } from 'effector-forms';

const form = createForm({
  fields: {
    name: {
      init: '',
    },
    countryCode: {
      init: '',
    },
    region: {
      init: '',
    },
  },
});

const saveFx = createEffect();

const SaveTeamForm = () => {
  return (
    <SubmitForm form={form} submitFx={saveFx}>
      <Grid container rowSpacing={3}>
        <Grid item xs={8}>
          <FormBuilder.Text field={form.fields.name} label="Team name" />
        </Grid>
        <Grid container item>
          <Grid item xs={8}>
            <FormBuilder.Text field={form.fields.countryCode} label="Country Code" />
          </Grid>
          <Grid item xs={3} sx={{ ml: 2 }}>
            <FormBuilder.Text field={form.fields.region} label="Region" />
          </Grid>
        </Grid>
      </Grid>
    </SubmitForm>
  );
};

export default SaveTeamForm;
