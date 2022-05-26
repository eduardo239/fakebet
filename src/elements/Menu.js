import React from 'react';
import MyBets from './MyBets';
import MyProfile from './MyProfile';
import { Link } from 'react-router-dom';
import { Avatar, Dialog, Pane } from 'evergreen-ui';
import '../css/menu.css';
import '../css/bet.css';

function Menu() {
  const [isMyBetsShown, setMyBetsIsShown] = React.useState(false);
  const [isProfileShown, setIsProfileShown] = React.useState(false);

  const closeModal = () => {
    setMyBetsIsShown(false);
  };
  const closeProfileModal = () => {
    setIsProfileShown(false);
  };

  return (
    <Pane position="relative">
      <Pane className="menu">
        <Pane display="flex" gap={4} alignItems="center">
          <Link to="/" className="menu-link">
            FAKEBET
          </Link>
          <Link to="/games" className="menu-link">
            JOGOS
          </Link>
          <Link to="/transfer" className="menu-link">
            DEPÓSITO
          </Link>
        </Pane>
        <Pane display="flex" gap={4} alignItems="center">
          {/* <Pane position="relative">
            <Pane
              className="my-bets-container"
              display={isShown === true ? 'flex' : 'none'}
            >
              <MyBets closeModal={closeModal} />
            </Pane>
          </Pane> */}
          <Link
            className="menu-link"
            to="#"
            onClick={() => setMyBetsIsShown(!isMyBetsShown)}
          >
            MINHAS APOSTAS
          </Link>

          <Link to="/admin" className="menu-link">
            ADMIN
          </Link>
          <Link to="/signup" className="menu-link">
            REGISTRAR
          </Link>
          <Link to="/signin" className="menu-link">
            ENTRAR
          </Link>
          <Link to="#" onClick={() => setIsProfileShown(!isMyBetsShown)}>
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
        title="Apostas"
        onConfirm={() => alert('saved')}
        confirmLabel="Salvar"
      >
        <MyBets closeModal={closeModal} />
      </Dialog>
      <Dialog
        isShown={isProfileShown}
        title="Perfil"
        onCloseComplete={() => setIsProfileShown(false)}
        confirmLabel="Fechar"
      >
        <MyProfile closeModal={closeProfileModal} />
      </Dialog>
    </Pane>
  );
}

export default Menu;
