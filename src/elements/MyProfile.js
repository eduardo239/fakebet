import React from 'react';
import { Alert, Button, Heading, Pane, Small, TextInput } from 'evergreen-ui';
import { userEdit } from '../api/user';
import { UserContext } from '../context/UserContext';
import { validateEmail, validatePassword } from '../utils/regex';
import {
  ERROR_USER_UPDATE,
  SUCCESS_USER_UPDATE,
  ERROR_RESET,
  ERROR_USERNAME_MIN_LENGTH,
  ERROR_PASSWORD_DOES_NOT_MATCH,
} from '../utils/constants';
import { errorHandler } from '../utils/error';
import { TeamContext } from '../context/TeamContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

function MyProfile({ data, setIsProfileShown, ...props }) {
  const { resetTeam } = React.useContext(TeamContext);
  const [, setUserLocalStorage] = useLocalStorage('user', null);
  const { user, setUser, user_, setUser_ } = React.useContext(UserContext);

  const [error, setError] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const onSubmit = async () => {
    const emailValidated = validateEmail(user_.email);
    const passwordValidated = validatePassword(user_.password);
    const passwordMatch = user_.password === user_.password2;
    const usernameValidated = user_.username.length > 3;

    let editedUser = null;

    if (user_.password && passwordValidated && passwordMatch) {
      editedUser = {
        id: user_.userId,
        username: user_.username,
        email: user_.email,
        password: user_.password,
      };
    } else if (!user_.password && !user_.password2) {
      editedUser = {
        id: user_.userId,
        username: user_.username,
        email: user_.email,
      };
    } else {
      errorHandler(ERROR_PASSWORD_DOES_NOT_MATCH, setError);
      return;
    }

    if (emailValidated && usernameValidated) {
      const { data: response } = await userEdit(editedUser);
      if (response.success) {
        setUser(response.user);
        errorHandler(SUCCESS_USER_UPDATE, setError, response.message);
        resetTeam();
        setTimeout(() => {
          errorHandler(ERROR_RESET, setError);
        }, 3000);
      } else {
        errorHandler(ERROR_USER_UPDATE, setError, response.message);
      }
    } else {
      errorHandler(ERROR_USERNAME_MIN_LENGTH, setError);
    }
  };

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUserLocalStorage(foundUser);
        setUser(foundUser);

        setUser_({
          userId: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
          password: '',
          password2: '',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Pane display='flex' justifyContent='center'>
      <Pane className='form-grid' marginBottom={64}>
        <Pane className='form-grid--field'>
          <Heading size={400}>Nome usuário:</Heading>
          <TextInput
            name='Nome do usuário'
            placeholder='Insira seu nome de usuário'
            value={user_.username}
            onChange={(e) => setUser_({ ...user_, username: e.target.value })}
          />
        </Pane>
        <Pane className='form-grid--field'>
          <Heading size={400}>E-mail:</Heading>
          <TextInput
            name='E-mail'
            placeholder='Insira seu e-mail'
            value={user_.email}
            onChange={(e) => setUser_({ ...user_, email: e.target.value })}
          />
        </Pane>
        <Pane className='form-grid--field'>
          <Heading size={400}>Senha:</Heading>
          <TextInput
            name='Senha'
            placeholder='Senha com no mínimo 6 caracteres, com letras e números'
            value={user_.password}
            onChange={(e) => setUser_({ ...user_, password: e.target.value })}
          />
          <Pane className='form-grid--field' maxWidth={280}>
            <Small className='dark small'>
              A senha deve ter no mínimo 6 caracteres, letra minúscula, letra
              maiúscula e número
            </Small>
          </Pane>
        </Pane>
        <Pane className='form-grid--field'>
          <Heading size={400}>Confirme a Senha:</Heading>
          <TextInput
            name='text-input-name'
            placeholder='Confirme a senha...'
            value={user_.password2}
            onChange={(e) => setUser_({ ...user_, password2: e.target.value })}
          />
        </Pane>
        <Pane className='form-grid--field'>
          <Pane display='flex' justifyContent='space-between'>
            <Button appearance='primary' onClick={onSubmit}>
              Salvar
            </Button>
            <Button
              appearance='minimal'
              onClick={() => setIsProfileShown(false)}
            >
              Sair
            </Button>
          </Pane>
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

export default MyProfile;
