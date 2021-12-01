import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css';
import App from './App.js';
import { UserProvider } from "./Contexts/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')


);

