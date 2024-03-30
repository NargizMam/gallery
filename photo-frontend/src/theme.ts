import {createTheme} from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: 'Dancing Script',
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
    MuiCard: {
      styleOverrides: {
        root: {
          margin: '10px',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          height: '200px',
          borderRadius: '10px',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.1)', // Увеличиваем размер при наведении
          },
        },
      },
    },
  },
});

export default theme;