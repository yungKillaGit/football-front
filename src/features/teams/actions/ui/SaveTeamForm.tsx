import { Grid } from '@mui/material';
import { FormBuilder, SubmitForm } from '@ui';
import { createEffect } from 'effector';
import { createForm } from 'effector-forms';
import { RegionsSelect } from 'entities/regions';

interface FormValues {
  name: string;
  countryCode: string;
  region: number | null;
}

const form = createForm<FormValues>({
  fields: {
    name: {
      init: '',
    },
    countryCode: {
      init: '',
    },
    region: {
      init: null,
    },
  },
});

const saveFx = createEffect();

const SaveTeamForm = () => {
  return (
    <SubmitForm form={form} submitFx={saveFx}>
      <Grid container rowSpacing={3}>
        <Grid item xs={7}>
          <FormBuilder.Text field={form.fields.name} label="Team name" />
        </Grid>
        <Grid container item>
          <Grid item xs={7}>
            <FormBuilder.Text field={form.fields.countryCode} label="Country Code" />
          </Grid>
          <Grid item xs={4} sx={{ ml: 'auto' }}>
            <RegionsSelect
              field={form.fields.region}
              label="Region"
            />
          </Grid>
        </Grid>
      </Grid>
    </SubmitForm>
  );
};

export default SaveTeamForm;
