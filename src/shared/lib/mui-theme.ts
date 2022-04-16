import { createTheme } from '@mui/material';

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#ac5e00',
      light: '#FFF',
    },
    secondary: {
      main: '#e2af1e',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          paddingTop: 10,
          paddingBottom: 10,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          userSelect: 'none',
          fontFamily: 'Tahoma, sans-serif',
        },
      },
    },
  },
  typography: {
    body1: {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px',
    },
    h2: {
      fontWeight: 600,
      fontSize: '26px',
      lineHeight: '36px',
    },
  },
});
