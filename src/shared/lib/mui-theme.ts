import { createTheme, CSSInterpolation } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

const palette = {
  primary: {
    main: '#ac5e00',
    light: '#FFF',
  },
  secondary: {
    main: '#e2af1e',
  },
};

const typography: TypographyOptions = {
  allVariants: {
    fontFamily: [
      'Tahoma',
      'sans-serif',
    ].join(', '),
  },
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
  h3: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '34px',
  },
  h4: {
    fontWeight: 500,
    fontSize: '22px',
    lineHeight: '32px',
  },
  h5: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '30px',
  },
  caption: {
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '18px',
  },
};

const BaseInputStyle: CSSInterpolation = {
  ...typography.body1,
  padding: '8px 12px',
};

export const muiTheme = createTheme({
  palette,
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
    MuiButton: {
      styleOverrides: {
        contained: {
          '&:hover': {
            background: palette.secondary.main,
          },
        },
      },
      defaultProps: {
        variant: 'contained',
        type: 'button',
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: 'unset',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: BaseInputStyle,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: BaseInputStyle,
      },
    },
    MuiTableRow: {
      styleOverrides: {
        hover: {
          cursor: 'pointer',
        },
      },
    },
  },
  typography,
});
