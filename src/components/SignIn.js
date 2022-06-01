import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Pane, TextInputField, Heading, Alert } from 'evergreen-ui';
import '../css/sign.css';
import { WARNING } from '../utils/constants';
import { browserDetect } from '../utils/utils';
import { signIn } from '../api/user';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserContext } from '../context/UserContext';

function SignInView() {
  const { setUser } = React.useContext(UserContext);
  const [, setUserLocalStorage] = useLocalStorage('user', null);

  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [error, setError] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const handleSignIn = async () => {
    setError({
      title: '',
      message: '',
      status: false,
      type: '',
    });

    if (password === '') {
      setError({
        title: 'Erro',
        message: 'Por favor, preencha o campo de senha.',
        status: true,
        type: WARNING,
      });
    } else if (!username) {
      setError({
        title: 'Erro',
        message: 'Por favor, preencha o campo de email.',
        status: true,
        type: WARNING,
      });
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
        setTimeout(() => {
          navigate('/');
        }, 0);
      } else {
        setError({
          title: 'Error',
          message: response.message || 'Erro ao realizar login.',
          status: true,
          type: WARNING,
        });
      }
    }
  };

  return (
    <Pane display="flex" justifyContent="center">
      <Pane elevation={2} className="form-container">
        <Heading size={700} marginBottom={24}>
          Login
        </Heading>

        <Pane className="form">
          <TextInputField
            type="email"
            label="E-mail"
            placeholder="Text input placeholder..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextInputField
            type="password"
            label="Password"
            placeholder="Text input placeholder..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Pane>

        <Pane marginTop={8}>
          <Button appearance="primary" width="100%" onClick={handleSignIn}>
            Login
          </Button>
        </Pane>

        <Pane display="flex" justifyContent="flex-end">
          <Link to="/signup">
            <Button marginTop={32} appearance="minimal">
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
