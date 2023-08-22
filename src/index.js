import React from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';

import './index.css';
import './styles/Colors.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SnackbarProvider autoHideDuration={3000} maxSnack={5}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

