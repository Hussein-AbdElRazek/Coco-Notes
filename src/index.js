import React from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import './styles/App.css';
import './styles/Colors.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import store from './store/index'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <SnackbarProvider autoHideDuration={3000} maxSnack={5}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);

