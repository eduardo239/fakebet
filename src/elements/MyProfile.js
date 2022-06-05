import React from 'react';
import { Alert, Button, Heading, Pane, Small, TextInput } from 'evergreen-ui';
import { userEdit } from '../api/user';
import { UserContext } from '../context/UserContext';
import { validateEmail, validatePassword } from '../utils/regex';
import { SUCCESS, WARNING } from '../utils/constants';

function MyProfile({ data, setIsProfileShown, ...props }) {
  const { setUser } = React.useContext(UserContext);

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [userId, setUserId] = React.useState('');

  const [error, setError] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const onSubmit = async () => {
    const emailValidated = validateEmail(email);
    const passwordValidated = validatePassword(password);
    const passwordMatch = password === password2;
    const usernameValidated = username.length > 3;

    let editedUser = null;
    if (password && passwordValidated && passwordMatch) {
      editedUser = {
        id: userId,
        username,
        email,
        password,
      };
    } else if (!password && !password2) {
      editedUser = {
        id: userId,
        username,
        email,
      };
    } else {
      setError({
        title: 'Erro',
        message: 'Senha inválida',
        status: true,
        type: WARNING,
      });
      return;
    }

    if (emailValidated && usernameValidated) {
      const { data: response } = await userEdit(editedUser);
      if (response.success) {
        setError({
          title: 'Atualização',
          message: response.message || 'Algo errado aconteceu',
          status: true,
          type: SUCCESS,
        });
        setUser(response.user);
        setTimeout(() => {
          setError({
            title: '',
            message: '',
            status: false,
            type: '',
          });
        }, 3000);
      } else {
        setError({
          title: 'Sign up failed! 1',
          message: response.message || 'Algo errado aconteceu',
          status: true,
          type: WARNING,
        });
      }
    } else {
      setError({
        title: 'Erro de validação',
        message:
          'O nome de usuário deve ter mais de 3 caracteres, e o email deve ser válido',
        status: true,
        type: WARNING,
      });
    }
  };

  React.useEffect(() => {
    setUsername(data.username);
    setEmail(data.email);
    setUserId(data._id);
  }, [data]);

  return (
    <Pane display='flex' justifyContent='center'>
      <Pane className='form-grid' marginBottom={64}>
        <Pane className='form-grid--field'>
          <Heading size={400}>Nome usuário:</Heading>
          <TextInput
            name='text-input-name'
            placeholder='Text input placeholder...'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Pane>
        <Pane className='form-grid--field'>
          <Heading size={400}>E-mail:</Heading>
          <TextInput
            name='text-input-name'
            placeholder='Text input placeholder...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Pane>
        <Pane className='form-grid--field'>
          <Heading size={400}>Senha:</Heading>
          <TextInput
            name='text-input-name'
            placeholder='Senha com no mínimo 6 caracteres'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
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
