import React from 'react';
import MyBets from '../user/Bets';
import MyProfile from '../user/Profile';
import { Link, useNavigate } from 'react-router-dom';
import { GameContext } from '../../context/GameContext';
import { UserContext } from '../../context/UserContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Avatar, Dialog, Pane } from 'evergreen-ui';
import { getUserInfo, userEdit } from '../../api/user';
import { getBetsByUserId, removeBetById } from '../../api/bet';
import { INITIAL_STATE_SPORT } from '../../utils/constants';

function Menu() {
  let navigate = useNavigate();
  const { user, setUser, logout } = React.useContext(UserContext);
  const { setSport, setSelectedIndex } = React.useContext(GameContext);
  const [, setUserLocalStorage] = useLocalStorage('user', null);

  const [isMyBetsShown, setIsMyBetsShown] = React.useState(false);
  const [isProfileShown, setIsProfileShown] = React.useState(false);
  const [isAmountShown, setIsAmountShown] = React.useState(true);
  const [myBets, setMyBets] = React.useState([]);

  const onMyBetsClick = async () => {
    let { data: response } = await getBetsByUserId(user._id);
    if (response.success) {
      setMyBets(response.bets);
    }
    setIsMyBetsShown(true);
  };

  const handleHomePage = (e) => {
    e.preventDefault();
    setSport(INITIAL_STATE_SPORT);
    setSelectedIndex(0);
    navigate('/');
  };

  const handleRemoveBet = async (id) => {
    let balance = user.balance.amount;
    let newBalance = balance + myBets.find((bet) => bet._id === id).value;

    let editedUser = {
      id: user._id,
      balance: {
        amount: newBalance,
      },
    };

    //update user balance
    let { data: userResponse } = await userEdit(editedUser);
    if (userResponse.success) {
      let { data: removeResponse } = await removeBetById(id);

      if (removeResponse.success) {
        setMyBets(myBets.filter((bet) => bet._id !== id));
        setUserLocalStorage(userResponse.user);
        setUser(userResponse.user);
      } else {
        console.error(removeResponse.message);
      }
    } else {
      console.error(userResponse.message);
    }
  };

  return (
    <Pane position='relative'>
      <Pane className='menu'>
        <Pane display='flex' gap={4} alignItems='center'>
          <Link to='#' className='menu-link' onClick={handleHomePage}>
            FAKEBET
          </Link>
          {user && (
            <Link to='/transfer' className='menu-link'>
              DEPÓSITO
            </Link>
          )}
        </Pane>

        <Pane display='flex' gap={4} alignItems='center'>
          {user && (
            <Link
              className='menu-link'
              to='#'
              onClick={() => setIsAmountShown(!isAmountShown)}
            >
              {user && isAmountShown ? `R$${user.balance.amount}` : 'SALDO'}
            </Link>
          )}
          {user && (
            <Link className='menu-link' to='#' onClick={() => onMyBetsClick()}>
              MINHAS APOSTAS
            </Link>
          )}

          <Link to='/admin' className='menu-link'>
            ADMIN
          </Link>
          <Link to='/api' className='menu-link'>
            API
          </Link>

          {!user && (
            <Link to='/signup' className='menu-link'>
              REGISTRAR
            </Link>
          )}
          {!user && (
            <Link to='/signin' className='menu-link'>
              ENTRAR
            </Link>
          )}
          {user && (
            <Link to='#' onClick={() => logout()} className='menu-link'>
              SAIR
            </Link>
          )}

          {user && (
            <Link
              to='#'
              onClick={() => setIsProfileShown(!isProfileShown)}
              className='menu-link'
            >
              {user && user.username}
            </Link>
          )}
        </Pane>
      </Pane>

      <Dialog
        isShown={isMyBetsShown}
        title='Minhas Apostas'
        hasCancel={false}
        confirmLabel='Fechar'
        onCloseComplete={() => setIsMyBetsShown(false)}
      >
        <MyBets
          bets={myBets}
          handleRemoveBet={handleRemoveBet}
          setMyBetsIsShown={setIsMyBetsShown}
        />
      </Dialog>

      <Dialog
        isShown={isProfileShown}
        title='Perfil'
        confirmLabel='Fechar'
        hasCancel={false}
        hasClose={true}
        onCloseComplete={() => setIsProfileShown(false)}
      >
        <MyProfile data={user} setIsProfileShown={setIsProfileShown} />
      </Dialog>
    </Pane>
  );
}

export default Menu;
