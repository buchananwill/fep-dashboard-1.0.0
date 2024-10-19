import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'inherit'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Prevent capitalization
          fontWeight: 'normal'
        }
      }
    }
  }
});
