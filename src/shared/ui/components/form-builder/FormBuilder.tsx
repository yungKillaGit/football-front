import { Select } from './inputs/select';
import { TextInput } from './inputs/text';
import { withInput } from './with-input';

export const FormBuilder = {
  Text: withInput(TextInput),
  Select: withInput(Select),
};
