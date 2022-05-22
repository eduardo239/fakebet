import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Pane, TextInputField, Heading, Alert } from 'evergreen-ui';
import '../css/sign.css';

function SignIn() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [error, setError] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const handleSignIn = () => {
    setError({
      title: '',
      message: '',
      status: false,
      type: '',
    });

    if (password !== 'qqQQ11') {
      setError({
        title: 'Wrong password',
        message: 'Please try again',
        status: true,
        type: 'danger',
      });
    }
  };

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddingTop={64}
    >
      <Pane padding={32} elevation={2} className="sign">
        <Heading size={700} marginTop={16} marginBottom={16}>
          LOGIN
        </Heading>

        <Pane>
          <TextInputField
            type="email"
            label="E-mail"
            placeholder="Text input placeholder..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            marginBottom={8}
          />
        </Pane>

        <Pane marginBottom={32}>
          <TextInputField
            type="password"
            label="Password"
            placeholder="Text input placeholder..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            marginBottom={8}
          />
        </Pane>

        <Pane>
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

export default SignIn;
