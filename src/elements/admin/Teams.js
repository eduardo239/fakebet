import {
  Button,
  Heading,
  Pane,
  Select,
  Small,
  TextInputField,
} from 'evergreen-ui';
import React from 'react';
import FileUploaderSingleUpload from './FilleUploader';

function Teams() {
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [emblem, setEmblem] = React.useState('');
  const [shortName, setShortName] = React.useState('');

  const submitTeam = () => {
    const game = {
      name,
      type,
      emblem,
      shortName,
    };

    console.log(game);
  };

  return (
    <Pane display="flex" justifyContent="center">
      <Pane elevation={2} className="form-container">
        <Heading size={700} marginBottom={24}>
          Adicionar Times
        </Heading>

        <Pane className="form">
          <TextInputField
            label="Team name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Small className="label">Método de depósito</Small>
          <Select
            width="100%"
            className="select"
            marginBottom={24}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="futebol">Futebol</option>
            <option value="basquete">Basquete</option>
            <option value="esports">Esports</option>
          </Select>

          <FileUploaderSingleUpload />

          <TextInputField
            label="Emblem"
            placeholder="URL from team emblem"
            value={emblem}
            onChange={(e) => setEmblem(e.target.value)}
          />

          <TextInputField
            label="Short name"
            placeholder="XTQ"
            value={shortName}
            onChange={(e) => setShortName(e.target.value.toUpperCase())}
          />

          <Pane marginTop={8}>
            <Button appearance="primary" width="100%" onClick={submitTeam}>
              Adicionar
            </Button>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Teams;
