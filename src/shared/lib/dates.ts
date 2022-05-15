import { format } from 'date-fns';

export const DATE_FORMAT = 'dd.MM.yyyy';

export const formatDate = (value: string | Date) => {
  if (value) {
    return format(new Date(value), DATE_FORMAT);
  }
  return value;
};
