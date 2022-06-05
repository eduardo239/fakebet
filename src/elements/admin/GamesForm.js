import React from 'react';
import {
  Button,
  Heading,
  Pane,
  Select,
  Small,
  TextInputField,
} from 'evergreen-ui';
import { GameContext } from '../../context/GameContext';
import { TeamContext } from '../../context/TeamContext';
import { getGames, postGame } from '../../api/game';

function Games() {
  const { game, setGame, setAllGames } = React.useContext(GameContext);
  const { teams, sports } = React.useContext(TeamContext);

  const handleSubmit = async () => {
    let { data: response } = await postGame(game);
    if (response.success) {
      let { data: responseGames } = await getGames();
      if (responseGames.success) {
        setAllGames(responseGames.games);
      }
    } else {
      // error
    }
  };

  const handleUpdate = () => {
    console.log('update');
  };

  return (
    <Pane display='flex' justifyContent='center'>
      <Pane elevation={2} className='form-container' alignSelf='center'>
        <Heading size={700} marginBottom={24}>
          Adicionar Jogo
        </Heading>

        <Pane className='form'>
          <Pane>
            <Small className='label'>Time A</Small>
            <Select
              marginTop={8}
              width='100%'
              className='select'
              marginBottom={24}
              name='teamAId'
              value={game.teamAId}
              onChange={(e) => setGame({ ...game, teamAId: e.target.value })}
            >
              <option value='' defaultChecked>
                ---
              </option>
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
            <Small className='label'>Time B</Small>
            <Select
              marginTop={8}
              width='100%'
              className='select'
              marginBottom={24}
              name='teamB'
              value={game.teamBId}
              onChange={(e) => setGame({ ...game, teamBId: e.target.value })}
            >
              <option value='' defaultChecked>
                ---
              </option>
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
            type='datetime-local'
            label='Data e Hora do Jogo'
            value={game.createdAt}
            onChange={(e) => setGame({ ...game, createdAt: e.target.value })}
          />

          <Pane>
            <Small className='label'>Esporte</Small>
            <Select
              marginTop={8}
              width='100%'
              className='select'
              marginBottom={24}
              name='type'
              onChange={(e) => setGame({ ...game, type: e.target.value })}
            >
              <option value='' defaultChecked>
                ---
              </option>
              {sports &&
                sports.length > 0 &&
                sports.map((sport) => (
                  <option key={sport._id} value={sport._id}>
                    {sport.name}
                  </option>
                ))}
            </Select>
          </Pane>

          <TextInputField
            type='number'
            label='Pontuação Time 1'
            value={game.team1Result}
            onChange={(e) => setGame({ ...game, teamAScore: e.target.value })}
          />

          <TextInputField
            type='number'
            label='Pontuação Time 2'
            value={game.team2Result}
            onChange={(e) => setGame({ ...game, teamBScore: e.target.value })}
          />

          <TextInputField
            type='number'
            label='Odd Time 1'
            value={game.teamAOdd}
            onChange={(e) => setGame({ ...game, teamAOdd: e.target.value })}
          />

          <TextInputField
            type='number'
            label='Odd Time 2'
            value={game.teamBOdd}
            onChange={(e) => setGame({ ...game, teamBOdd: e.target.value })}
          />

          <TextInputField
            label='Vencedor'
            placeholder='Vencedor do Jogo'
            value={game.winner}
            onChange={(e) => setGame({ ...game, winner: e.target.value })}
          />
        </Pane>

        <Pane marginTop={8}>
          <Button marginRight={16} appearance='primary' onClick={handleSubmit}>
            Adicionar
          </Button>
          <Button appearance='minimal' onClick={handleUpdate}>
            Atualizar
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Games;
