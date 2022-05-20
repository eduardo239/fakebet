import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/reset.css';
import './css/base.css';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
