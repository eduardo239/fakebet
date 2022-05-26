import { Heading, Pane, TextInput } from 'evergreen-ui';
import React from 'react';

function MyProfile() {
  return (
    <Pane display="flex" justifyContent="center">
      <Pane className="form-grid">
        <Heading size={400}>Nome usuário:</Heading>
        <TextInput
          name="text-input-name"
          placeholder="Text input placeholder..."
        />

        <Heading size={400}>E-mail:</Heading>
        <TextInput
          name="text-input-name"
          placeholder="Text input placeholder..."
        />

        <Heading size={400}>Senha:</Heading>
        <TextInput
          name="text-input-name"
          placeholder="Text input placeholder..."
        />
      </Pane>
    </Pane>
  );
}

export default MyProfile;
