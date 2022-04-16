import React from 'react';
import { StyledEngineProvider } from '@mui/material';

export const withStyledEngineProvider = (component: () => React.ReactNode) => () => {
  return (
    <StyledEngineProvider injectFirst>
      {component()}
    </StyledEngineProvider>
  );
};
