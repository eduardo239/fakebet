import { Button, Heading, Pane, Select, TextInputField } from 'evergreen-ui';
import React from 'react';

function Games() {
  const [name1, setName1] = React.useState('');
  const [name2, setName2] = React.useState('');
  const [createdAt, setCreatedAt] = React.useState('');
  const [type, setType] = React.useState('');
  const [team1Result, setTeam1Result] = React.useState(0);
  const [team2Result, setTeam2Result] = React.useState(0);
  const [winner, setWinner] = React.useState('');

  const submitGame = () => {
    const game = {
      name1,
      name2,
      createdAt,
      type,
      team1Result,
      team2Result,
      winner,
    };

    console.log(game);

    // fetch('/api/games', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name1,
    //     name2,
    //     createdAt,
    //     type,
    //     team1Result,
    //     team2Result,
    //     winner,
    //   }),
    // });
  };

  return (
    <Pane display="flex" justifyContent="center" flexDirection="column">
      <Heading size={600} padding={24} className="light">
        Editar os jogos
      </Heading>
      <Pane padding={32} className="admin-form">
        <TextInputField
          label="Team 1"
          placeholder="Name of the team 1"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          required
        />
        <TextInputField
          label="Team 2"
          placeholder="Name of the team 2"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          required
        />
        <TextInputField
          type="date"
          label="Hora do jogo"
          placeholder="new Date()"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
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
          type="number"
          label="Team 1 Result"
          placeholder="0, 1, ..., 10"
          value={team1Result}
          onChange={(e) => setTeam1Result(e.target.value)}
        />
        <TextInputField
          type="number"
          label="Team 2 Result"
          placeholder="0, 1, ..., 10"
          value={team2Result}
          onChange={(e) => setTeam2Result(e.target.value)}
        />
        <TextInputField
          label="Winner"
          placeholder="winner of the game"
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
        />
        <Pane marginBottom={24}>
          <Button appearance="primary" width="100%" onClick={submitGame}>
            Add
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Games;
