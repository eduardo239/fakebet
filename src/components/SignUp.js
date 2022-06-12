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
import { signUp } from '../api/user';
import { useNavigate } from 'react-router-dom';
import { browserDetect } from '../utils/utils';
import { validateEmail, validatePassword } from '../utils/regex';
import {
  ERROR_DB_MESSAGE,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_PASSWORD,
  ERROR_PASSWORD_DOES_NOT_MATCH,
  ERROR_RESET,
  ERROR_TERMS,
  ERROR_USERNAME_MIN_LENGTH,
  SUCCESS,
} from '../utils/constants';
import { errorHandler } from '../utils/error';

function SignUpView() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [password2, setPassword2] = React.useState('');

  const [checkTerms, setCheckTerms] = React.useState(false);
  const [checkAge, setCheckAge] = React.useState(false);
  const [error, setError] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const handleSignUp = async () => {
    const emailValidated = validateEmail(email);
    const passwordValidated = validatePassword(password);
    const passwordMatch = password === password2;
    const usernameValidated = username.length > 3;

    if (
      usernameValidated &&
      emailValidated &&
      passwordValidated &&
      passwordMatch &&
      checkTerms &&
      checkAge
    ) {
      setError({
        title: 'Sign up successful!',
        message: 'Redirecionando para a página de login... em 3 segundos',
        status: true,
        type: SUCCESS,
      });

      let user = {
        username,
        email,
        password,
        bets: [],
        balance: {
          amount: 0,
          currency: 'BRA',
          lastDeposit: null,
        },
        lastLogin: new Date(),
        browser: browserDetect(),
      };

      let { data: response } = await signUp(user);

      if (response.success) {
        user = response.data;
        localStorage.setItem('user', JSON.stringify(user));
        setTimeout(() => {
          navigate('/signin');
          errorHandler(ERROR_RESET, setError);
        }, 3000);
      } else {
        errorHandler(ERROR_DB_MESSAGE, setError, response.message);
      }
    } else if (!usernameValidated) {
      errorHandler(ERROR_USERNAME_MIN_LENGTH, setError);

      return;
    } else if (!emailValidated) {
      errorHandler(ERROR_INVALID_EMAIL, setError);
    } else if (!passwordValidated) {
      errorHandler(ERROR_INVALID_PASSWORD, setError);
    } else if (!checkTerms || !checkAge) {
      errorHandler(ERROR_TERMS, setError);
    } else if (!passwordMatch) {
      errorHandler(ERROR_PASSWORD_DOES_NOT_MATCH, setError);
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
            label='Username'
            placeholder='Placeholder text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextInputField
            label='E-mail'
            placeholder='Text input placeholder...'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInputField
            type='password'
            label='Password'
            placeholder='Text input placeholder...'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextInputField
            type='password'
            label='Password Confirmation'
            placeholder='Text input placeholder...'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />

          <Pane>
            <Checkbox
              label='I Agree to the Terms and Conditions'
              checked={checkTerms}
              onChange={(e) => setCheckTerms(e.target.checked)}
            />
            <Checkbox
              marginBottom={32}
              label='I am at least 18 years old'
              checked={checkAge}
              onChange={(e) => setCheckAge(e.target.checked)}
            />
          </Pane>

          <Pane marginTop={0}>
            <Button
              type='button'
              appearance='primary'
              width='100%'
              onClick={handleSignUp}
            >
              Register
            </Button>
          </Pane>

          <Pane display='flex' justifyContent='flex-end'>
            <Link to='/signin'>
              <Button marginTop={32} appearance='minimal'>
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
    </Pane>
  );
}

export default SignUpView;
