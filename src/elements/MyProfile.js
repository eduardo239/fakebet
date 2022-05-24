import { Heading, Pane, TextInput } from 'evergreen-ui';
import React from 'react';

function MyProfile() {
  return (
    <Pane display="flex" justifyContent="center">
      <Pane width="100%">
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={8}
        >
          <Heading size={400}>Nome usuário:</Heading>
          <TextInput
            name="text-input-name"
            placeholder="Text input placeholder..."
          />
        </Pane>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={8}
        >
          <Heading size={400}>E-mail:</Heading>
          <TextInput
            name="text-input-name"
            placeholder="Text input placeholder..."
          />
        </Pane>
        <Pane
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={8}
        >
          <Heading size={400}>Senha:</Heading>
          <TextInput
            name="text-input-name"
            placeholder="Text input placeholder..."
          />
        </Pane>
      </Pane>
    </Pane>
  );
}

export default MyProfile;
