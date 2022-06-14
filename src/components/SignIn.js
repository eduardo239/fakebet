import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Pane, TextInputField, Heading, Alert } from 'evergreen-ui';
import {
  ERROR_DB_MESSAGE,
  ERROR_EMPTY_PASSWORD,
  ERROR_EMPTY_USERNAME,
  ERROR_RESET,
} from '../utils/constants';
import { browserDetect } from '../utils/utils';
import { signIn } from '../api/user';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserContext } from '../context/UserContext';
import { errorHandler } from '../utils/error';
import '../css/sign.css';
import { GameContext } from '../context/GameContext';
import { getGamesByType } from '../api/game';

function SignInView() {
  const navigate = useNavigate();

  const { setUser } = React.useContext(UserContext);
  const { setAllGamesByType } = React.useContext(GameContext);
  const [, setUserLocalStorage] = useLocalStorage('user', null);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const handleSignIn = async () => {
    if (password === '') {
      errorHandler(ERROR_EMPTY_PASSWORD, setError);
    } else if (!username) {
      errorHandler(ERROR_EMPTY_USERNAME, setError);
    } else {
      let user = {
        username,
        password,
        lastLogin: new Date(),
        browser: browserDetect(),
      };

      let { data: response } = await signIn(user);

      if (response.success) {
        setUserLocalStorage(response.user);
        setUser(response.user);

        // get all games, futebol
        const { data: responseGamesType } = await getGamesByType({
          name: 'futebol',
        });

        if (responseGamesType.success) {
          setAllGamesByType(responseGamesType.games);
        }

        setTimeout(() => {
          navigate('/');
          errorHandler(ERROR_RESET, setError);
        }, 0);
      } else {
        errorHandler(ERROR_DB_MESSAGE, setError, response.message);
      }
    }
  };

  return (
    <Pane display='flex' justifyContent='center'>
      <Pane className='form-container-sign'>
        <Heading size={700} marginBottom={24}>
          Login
        </Heading>

        <Pane className='form-sign'>
          <TextInputField
            type='text'
            label='Nome de usuário'
            placeholder='Text input placeholder...'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextInputField
            type='password'
            label='Password'
            placeholder='Text input placeholder...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Pane>

        <Pane marginTop={8}>
          <Button appearance='primary' onClick={handleSignIn}>
            Login
          </Button>
        </Pane>

        <Pane display='flex' justifyContent='flex-end'>
          <Link to='/signup'>
            <Button marginTop={32} appearance='minimal'>
              I don't have an account
            </Button>
          </Link>
        </Pane>

        {error.status && (
          <Alert intent={error.type} title={error.title}>
            {error.message}
          </Alert>
        )}
      </Pane>
    </Pane>
  );
}

export default SignInView;
