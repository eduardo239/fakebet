import {
  Button,
  Heading,
  Pane,
  Select,
  Small,
  TextInputField,
} from 'evergreen-ui';
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
  };

  return (
    <Pane display="flex" justifyContent="center">
      <Pane elevation={2} className="form-container">
        <Heading ize={700} marginBottom={24}>
          Adicionar Jogos
        </Heading>
        <Pane className="form">
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
            type="datetime-local"
            label="Hora do jogo"
            placeholder="new Date()"
            value={createdAt}
            onChange={(e) => setCreatedAt(e.target.value)}
          />

          <Small className="label">Tipo de esporte</Small>
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

          <Pane marginTop={8}>
            <Button appearance="primary" width="100%" onClick={submitGame}>
              Adicionar
            </Button>
          </Pane>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Games;
