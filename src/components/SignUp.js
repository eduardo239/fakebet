import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Pane,
  TextInputField,
  Checkbox,
  Heading,
  Alert,
} from 'evergreen-ui';
import '../css/sign.css';
import { validateEmail, validatePassword } from '../utils/regex';
import { useNavigate } from 'react-router-dom';
import { DANGER, SUCCESS, WARNING } from '../utils/constants';

function SignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  const [checked, setChecked] = React.useState(true);
  const [error, setError] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const handleSignUp = () => {
    setError({
      title: '',
      message: '',
      status: false,
      type: '',
    });

    const emailValidated = validateEmail(email);
    const passwordValidated = validatePassword(password);
    const passwordMatch = password === password2;
    const usernameValidated = username.length > 3;

    if (
      usernameValidated &&
      emailValidated &&
      passwordValidated &&
      passwordMatch &&
      checked
    ) {
      alert('Sign up successful!');
    } else if (!usernameValidated) {
      setError({
        title: 'Username is too short',
        message: 'Username must be at least 4 characters long',
        status: true,
        type: WARNING,
      });
    } else if (!emailValidated) {
      setError({
        title: 'Invalid email',
        message: 'Please enter a valid email',
        status: true,
        type: WARNING,
      });
    } else if (!passwordValidated) {
      setError({
        title: 'Password',
        message:
          'Invalid password, must be at least 6 characters long, and contain at least one uppercase letter, one lowercase letter and one number',
        status: true,
        type: WARNING,
      });
    } else if (!checked) {
      setError({
        title: 'Terms and conditions',
        message: 'Please accept the terms and conditions',
        status: true,
        type: WARNING,
      });
    } else if (password !== password2) {
      setError({
        title: 'Password',
        message: 'Passwords do not match',
        status: true,
        type: DANGER,
      });
    }

    setError({
      title: 'Sign up successful!',
      message: 'Redirecting to login page, in 3 seconds...',
      status: true,
      type: SUCCESS,
    });

    setTimeout(() => {
      navigate('/');
    }, 3000);
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
          REGISTER
        </Heading>

        <Pane>
          <TextInputField
            label="Username"
            placeholder="Placeholder text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            marginBottom={8}
          />
        </Pane>

        <Pane>
          <TextInputField
            label="E-mail"
            placeholder="Text input placeholder..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            marginBottom={8}
          />
        </Pane>

        <Pane>
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
          <TextInputField
            type="password"
            label="Password Confirmation"
            placeholder="Text input placeholder..."
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            marginBottom={8}
          />
        </Pane>

        <Pane>
          <Checkbox
            marginBottom={32}
            label="I Agree to the Terms and Conditions"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        </Pane>

        <Pane>
          <Button
            type="button"
            appearance="primary"
            width="100%"
            onClick={handleSignUp}
          >
            Register
          </Button>
        </Pane>

        <Pane display="flex" justifyContent="flex-end">
          <Link to="/signin">
            <Button marginTop={32} appearance="minimal">
              I already have an account
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

export default SignUp;
