import compose from 'compose-function';
import { withRouter } from './with-router';
import { withTheme } from './with-theme';
import { withStyledEngineProvider } from './with-styled-engine-provider';

export const withProviders = compose(withRouter, withTheme, withStyledEngineProvider);
