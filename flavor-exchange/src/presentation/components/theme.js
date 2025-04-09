import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#e83f25',         // Default (normal) color
      light: '#f25d44',        // Hover color (lighter version)
      dark: '#b2301b',         // Active color (darker version)
      contrastText: '#ffffff'  // Text color on buttons (white text)
    }
  }
});

export default theme;