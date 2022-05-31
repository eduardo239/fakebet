import React from 'react';
import MyBets from './MyBets';
import MyProfile from './MyProfile';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Avatar, Dialog, Pane } from 'evergreen-ui';
import '../css/menu.css';
import '../css/bet.css';

function Menu() {
  const { user, logout } = React.useContext(UserContext);
  const [isMyBetsShown, setMyBetsIsShown] = React.useState(false);
  const [isProfileShown, setIsProfileShown] = React.useState(false);

  return (
    <Pane position="relative">
      <Pane className="menu">
        <Pane display="flex" gap={4} alignItems="center">
          <Link to="/" className="menu-link">
            FAKEBET
          </Link>
          {user && (
            <Link to="/transfer" className="menu-link">
              DEPÓSITO
            </Link>
          )}
          {user && (
            <Link to="#" className="menu-link">
              {user && user.username}
            </Link>
          )}
        </Pane>

        <Pane display="flex" gap={4} alignItems="center">
          {user && (
            <Link
              className="menu-link"
              to="#"
              onClick={() => setMyBetsIsShown(!isMyBetsShown)}
            >
              MINHAS APOSTAS
            </Link>
          )}

          <Link to="/admin" className="menu-link">
            ADMIN
          </Link>
          <Link to="/api" className="menu-link">
            API
          </Link>

          {!user && (
            <Link to="/signup" className="menu-link">
              REGISTRAR
            </Link>
          )}
          {!user && (
            <Link to="/signin" className="menu-link">
              ENTRAR
            </Link>
          )}
          {user && (
            <Link to="#" onClick={() => logout()} className="menu-link">
              SAIR
            </Link>
          )}
          <Link to="#" onClick={() => setIsProfileShown(!isProfileShown)}>
            <Avatar
              src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
              name="Alan Turing"
              size={34}
            />
          </Link>
        </Pane>
      </Pane>

      <Dialog
        isShown={isMyBetsShown}
        title="Minhas Apostas"
        onConfirm={() => alert('saved')}
        confirmLabel="Salvar"
      >
        <MyBets />
      </Dialog>

      <Dialog
        isShown={isProfileShown}
        title="Perfil"
        onConfirm={() => alert('saved')}
        confirmLabel="Salvar"
      >
        <MyProfile />
      </Dialog>
    </Pane>
  );
}

export default Menu;
