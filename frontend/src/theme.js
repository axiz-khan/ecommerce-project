import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: `'Lora', 'serif'`, // default for body
    h1: {
      fontFamily: `'Playfair Display', 'serif'`,
      fontWeight: 600,
    },
    h2: {
      fontFamily: `'Playfair Display', 'serif'`,
      fontWeight: 500,
    },
    // you can add h3, h4, etc. similarly
  },
});

export default theme;
