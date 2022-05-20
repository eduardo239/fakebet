import { Pane } from 'evergreen-ui';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Deposit from './components/Deposit';
import Game from './components/Game';
import Games from './components/Games';
import Menu from './elements/Menu';

function App() {
  return (
    <Pane display="flex" flexDirection="column" maxWidth={1000} width="100%">
      <Menu></Menu>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/games" element={<Games />} />
        <Route exact path="/deposit" element={<Deposit />} />
        <Route exact path="/games/123" element={<Game />} />
      </Routes>
    </Pane>
  );
}

export default App;
