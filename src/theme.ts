import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      white: string;
      black: string;
    }
  }
  interface  PaletteOptions {
    custom: {
      white: string;
      black: string;
    } 
  }
}

const customTheme = createTheme({
  palette: {
    custom: {
      white: '#FFFFFF',
      black: '#1D192B',
    },
    primary: {main: '#f4ebe2'},
    secondary: {main:'#3D2C2E'},
    error: {main:'#8E412E'},
    warning: {main:'#424C55'},
    info: {main:'#D1CCDC'},
    success: {main:'#886F68'},
  },
});

export default customTheme;