import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

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

ReactDOM.render(
    <Provider store={store}> {/* Ensure the Provider wraps the entire app */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
