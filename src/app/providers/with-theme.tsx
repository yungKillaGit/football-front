import React from 'react';
import { ThemeProvider } from '@mui/material';
import { muiTheme } from 'shared/lib';

export const withTheme = (component: () => React.ReactNode) => () => {
  return (
    <ThemeProvider theme={muiTheme}>
      {component()}
    </ThemeProvider>
  );
};
