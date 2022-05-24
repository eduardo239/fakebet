import { Button, Heading, Pane, TextInputField } from 'evergreen-ui';
import React from 'react';

function Teams() {
  const [name, setName] = React.useState('');
  const [gameType, setGameType] = React.useState('');
  const [emblem, setEmblem] = React.useState('');
  const [shortName, setShortName] = React.useState('');
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
        <TextInputField
          label="Game type"
          placeholder="Futebol, Basquete .."
          value={gameType}
          onChange={(e) => setGameType(e.target.value)}
        />

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
          onChange={(e) => setShortName(e.target.value)}
        />
        <Button appearance="primary">Add</Button>
      </Pane>
    </Pane>
  );
}

export default Teams;
