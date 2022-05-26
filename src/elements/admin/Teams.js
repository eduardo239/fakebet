import { Button, Heading, Pane, Select, TextInputField } from 'evergreen-ui';
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
    <Pane display="flex" justifyContent="center" flexDirection="column">
      <Heading size={600} padding={24} className="light">
        Editar os times
      </Heading>
      <Pane padding={32} className="admin-form">
        <TextInputField
          label="Team name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Pane marginBottom={24}>
          <Select
            width="100%"
            className="select"
            onChange={(event) => setType(event.target.value)}
          >
            <option value="futebol">Futebol</option>
            <option value="basquete">Basquete</option>
            <option value="esports">Esports</option>
          </Select>
        </Pane>

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

        <Button appearance="primary" width="100%" onClick={submitTeam}>
          Add
        </Button>
      </Pane>
      <FileUploaderSingleUpload />
    </Pane>
  );
}

export default Teams;
