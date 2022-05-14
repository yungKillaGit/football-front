import { bem, FormModel, FormModelValues } from '@lib';
import { ReactNode } from 'react';
import {
  FormProvider, UseFormReturn,
} from 'react-hook-form';
import { Button } from 'shared/ui';

import './SubmitForm.scss';

interface Props<FieldValues> {
  children: ReactNode;
  pending?: boolean;
  form: UseFormReturn<FieldValues>;
  formModel: FormModel<FieldValues>;
  canSubmit?: boolean;
  className?: string;
}

const { block, element } = bem('SubmitForm');

const SubmitForm = <T extends FormModelValues>({
  children,
  form,
  pending,
  formModel,
  canSubmit = true,
  className,
}: Props<T>) => {
  const { handleSubmit, formState } = form;

  const onValid = (data: any) => {
    formModel.events.formValidated(data);
  };

  return (
    <FormProvider {...form}>
      <form {...block(className)}>
        {children}
        <div {...element('actions')}>
          <Button
            disabled={pending || !formState.isValid || !canSubmit}
            onClick={handleSubmit(onValid)}
          >
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SubmitForm;
