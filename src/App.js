import React from 'react';
import { Pane } from 'evergreen-ui';
import { UserContext } from './context/UserContext';
import { Route, Routes } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Game from './components/Game';
import Menu from './elements/Menu';
import Admin from './components/Admin';
import Api from './components/API';
import Transfer from './components/Transfer';
import { AdminContextContent } from './context/AdminContext';

function App() {
  const { setUser } = React.useContext(UserContext);

  const [, setUserLocalStorage] = useLocalStorage('user', null);

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUserLocalStorage(foundUser);
      setUser(foundUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Pane className='app-container'>
      <Menu></Menu>

      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/all/:type/:page' element={<Home />} />
        <Route exact path='/all/:type' element={<Home />} />
        <Route exact path='/signin' element={<SignIn />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/transfer' element={<Transfer />} />
        <Route exact path='/all/:type/match/:match' element={<Game />} />
        <Route
          exact
          path='/admin'
          element={
            <AdminContextContent>
              <Admin />
            </AdminContextContent>
          }
        />
        <Route exact path='/api' element={<Api />} />
      </Routes>
    </Pane>
  );
}

export default App;
