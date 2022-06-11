import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import './css/reset.css';
import './css/base.css';
import './css/form.css';
import './css/animation.css';

import { TeamContextContent } from './context/TeamContext';
import { UserContextContent } from './context/UserContext';
import { GameContextContent } from './context/GameContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Router>
    <GameContextContent>
      <TeamContextContent>
        <UserContextContent>
          <App />
        </UserContextContent>
      </TeamContextContent>
    </GameContextContent>
  </Router>
);
