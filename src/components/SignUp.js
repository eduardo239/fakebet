import { Button, Pane, TextInputField, Checkbox, Heading } from 'evergreen-ui';
import React from 'react';

function SignUp() {
  const [checked, setChecked] = React.useState(true);
  const [value, setValue] = React.useState('');
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      paddingTop={32}
    >
      <Pane minWidth={300} padding={16} elevation={2}>
        <Heading size={700} marginTop={16} marginBottom={16}>
          REGISTER
        </Heading>

        <Pane>
          <TextInputField
            label="Username"
            placeholder="Placeholder text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            marginBottom={8}
          />
        </Pane>
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
          <Checkbox
            label="I Agree to the Terms and Conditions"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <Pane>
            <Button marginRight={16} appearance="primary" width="100%">
              Register
            </Button>
          </Pane>
          <Pane display="flex" justifyContent="flex-end">
            <Button marginRight={16} marginTop={32} appearance="minimal">
              I already have an account
            </Button>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default SignUp;
