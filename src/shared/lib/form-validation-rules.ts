interface Rule<T> {
  name: string;
  validator: (value: T) => boolean;
}

export const validationRules = {
  required: <T>(): Rule<T> => ({
    name: 'required',
    validator: (value) => {
      return Boolean(value);
    },
  }),
  minLength: (min: number): Rule<string> => ({
    name: 'minLength',
    validator: (value) => value.length >= min,
  }),
  maxLength: (max: number): Rule<string> => ({
    name: 'maxLength',
    validator: (value) => value.length <= max,
  }),
};
