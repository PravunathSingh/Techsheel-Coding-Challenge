import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UsersProvider from './context/usersContext';

ReactDOM.render(
  <UsersProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UsersProvider>,
  document.getElementById('root')
);
