import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from './redux/store';
import './index.css';
import App from './App.jsx';
import theme from './theme'; // adjust path if needed

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Normalizes browser styles */}
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
