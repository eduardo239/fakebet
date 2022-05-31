import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import './css/reset.css';
import './css/base.css';
import './css/icon.css';
import './css/form.css';
import './css/animation.css';
import { UserContextContent } from './context/UserContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Router>
    <UserContextContent>
      <App />
    </UserContextContent>
  </Router>
);
