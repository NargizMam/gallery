import {createTheme} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: 'monospace',
    fontSize: 16,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          marginBottom: '5px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        contained: {
          margin: '5px',
          backgroundColor: '#42c5c9',
          color: '#d6dee7',
          '&:hover': {
            backgroundColor: '#596c80',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '1rem',
          backgroundColor: '#e1eaec',
          color: '#4e96b0',
        },
      },
    },
  },
});

export default theme;