import {
  Button,
  Heading,
  Pane,
  Select,
  Small,
  TextInputField,
} from 'evergreen-ui';
import React from 'react';
import { postGame } from '../../api/game';
import { GameContext } from '../../context/GameContext';
import { TeamContext } from '../../context/TeamContext';

function Games() {
  const { game, setGame } = React.useContext(GameContext);
  const { teams } = React.useContext(TeamContext);

  const handleSubmit = async () => {
    console.log(game);
    await postGame(game);
  };

  const handleUpdate = () => {
    console.log('update');
  };

  return (
    <Pane display="flex" justifyContent="center">
      <Pane elevation={2} className="form-container">
        <Heading size={700} marginBottom={24}>
          Adicionar Jogo
        </Heading>

        <Pane className="form">
          <Pane>
            <Small className="label">Time A</Small>
            <Select
              marginTop={8}
              width="100%"
              className="select"
              marginBottom={24}
              onChange={(event) =>
                setGame({ ...game, teamAId: event.target.value })
              }
            >
              {teams &&
                teams.length > 0 &&
                teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
            </Select>
          </Pane>

          <Pane>
            <Small className="label">Time B</Small>
            <Select
              marginTop={8}
              width="100%"
              className="select"
              marginBottom={24}
              onChange={(event) =>
                setGame({ ...game, teamBId: event.target.value })
              }
            >
              {teams &&
                teams.length > 0 &&
                teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
            </Select>
          </Pane>

          <TextInputField
            type="datetime-local"
            label="Data e Hora do Jogo"
            value={game.createdAt}
            onChange={(e) => setGame({ ...game, createdAt: e.target.value })}
          />

          <Pane>
            <Small className="label">Esporte</Small>
            <Select
              marginTop={8}
              width="100%"
              className="select"
              marginBottom={24}
              onChange={(event) =>
                setGame({ ...game, type: event.target.value })
              }
            >
              <option value="" defaultChecked>
                ---
              </option>
              <option value="futebol">Futebol</option>
              <option value="basquete">Basquete</option>
              <option value="esports">Esports</option>
            </Select>
          </Pane>

          <TextInputField
            type="number"
            label="Pontuação Time 1"
            value={game.team1Result}
            onChange={(e) => setGame({ ...game, teamAScore: e.target.value })}
          />

          <TextInputField
            type="number"
            label="Pontuação Time 2"
            value={game.team2Result}
            onChange={(e) => setGame({ ...game, teamBScore: e.target.value })}
          />

          <TextInputField
            label="Vencedor"
            placeholder="Vencedor do Jogo"
            value={game.winner}
            onChange={(e) => setGame({ ...game, winner: e.target.value })}
          />
        </Pane>
        <Pane marginTop={8}>
          <Button marginRight={16} appearance="primary" onClick={handleSubmit}>
            Adicionar
          </Button>
          <Button appearance="minimal" onClick={handleUpdate}>
            Atualizar
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Games;
