// When using TypeScript 4.x and above
import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiRichTreeView: {
      styleOverrides: {
        root: {
          backgroundColor: 'red'
        }
      }
    }
  }
});
