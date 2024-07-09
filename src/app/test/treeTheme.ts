// When using TypeScript 4.x and above
import type {} from '@mui/x-tree-view/themeAugmentation';
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
