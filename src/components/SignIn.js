import { Button, Pane, TextInputField, Heading } from 'evergreen-ui';
import React from 'react';
import '../css/sign.css';

function SignIn() {
  const [value, setValue] = React.useState('');
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddingTop={32}
    >
      <Pane minWidth={350} padding={32} elevation={2} className="sign">
        <Heading size={700} marginTop={16} marginBottom={16}>
          REGISTER
        </Heading>

        <Pane>
          <TextInputField
            label="E-mail"
            placeholder="Text input placeholder..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            marginBottom={8}
          />
        </Pane>
        <Pane>
          <TextInputField
            type="password"
            label="Password"
            placeholder="Text input placeholder..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            marginBottom={8}
          />
        </Pane>
        <Pane>
          <Pane>
            <Button marginRight={16} appearance="primary" width="100%">
              Login
            </Button>
          </Pane>
          <Pane display="flex" justifyContent="flex-end">
            <Button marginRight={16} marginTop={32} appearance="minimal">
              I don't have an account
            </Button>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default SignIn;
