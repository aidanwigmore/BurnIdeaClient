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
    primary: {main: '#F4EBE2'},
    secondary: {main:'#687258'},
    error: {main:'#8E412E'},
    warning: {main:'#BA6F4D'},
    info: {main:'#E6CEBC'},
    success: {main:'#A2A182'},
  },
});

export default customTheme;