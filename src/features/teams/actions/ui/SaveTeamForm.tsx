import { FormBuilder, SubmitForm } from '@shared/ui';
import { createEffect } from 'effector';
import { createForm } from 'effector-forms';

const form = createForm({
  fields: {
    name: {
      init: '',
    },
  },
});

const saveFx = createEffect();

const SaveTeamForm = () => {
  return (
    <SubmitForm form={form} submitFx={saveFx}>
      <FormBuilder.Text field={form.fields.name} />
    </SubmitForm>
  );
};

export default SaveTeamForm;
