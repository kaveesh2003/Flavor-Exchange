import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#e83f25',        
      light: '#f25d44',        
      dark: '#b2301b',         
      contrastText: '#ffffff'  
    }
  }
});

export default theme;
