import { useForm, Form as EffectorForm } from 'effector-forms';
import { useStore } from 'effector-react';
import { Effect } from 'effector';
import { FormEvent, ReactNode } from 'react';
import { Button } from 'shared/ui';

interface Props {
  form: EffectorForm<any>;
  submitFx: Effect<any, any>;
  children: ReactNode;
}

const SubmitForm = ({ form, submitFx, children }: Props) => {
  const { submit, eachValid } = useForm(form);
  const pending = useStore(submitFx.pending);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <form onSubmit={onSubmit}>
      {children}
      <Button type="submit" disabled={pending || !eachValid}>
        Submit
      </Button>
    </form>
  );
};

export default SubmitForm;
