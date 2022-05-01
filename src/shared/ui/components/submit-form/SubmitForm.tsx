import { bem } from '@lib';
import { useForm, Form as EffectorForm } from 'effector-forms';
import { useStore } from 'effector-react';
import { Effect } from 'effector';
import { FormEvent, ReactNode } from 'react';
import { Button } from 'shared/ui';

import './SubmitForm.scss';

interface Props {
  form: EffectorForm<any>;
  submitFx: Effect<any, any>;
  children: ReactNode;
}

const { block, element } = bem('SubmitForm');

const SubmitForm = ({ form, submitFx, children }: Props) => {
  const { submit, eachValid } = useForm(form);
  const pending = useStore(submitFx.pending);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  return (
    <form onSubmit={onSubmit} {...block()}>
      {children}
      <div {...element('actions')}>
        <Button type="submit" disabled={pending || !eachValid}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default SubmitForm;
