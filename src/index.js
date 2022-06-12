import React from 'react';
import App from './App';

import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { TeamContextContent } from './context/TeamContext';
import { UserContextContent } from './context/UserContext';
import { GameContextContent } from './context/GameContext';

import './css/reset.css';
import './css/base.css';
import './css/form.css';
import './css/animation.css';
import './css/menu.css';
import './css/message.css';

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
