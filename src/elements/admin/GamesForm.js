import React from 'react';
import {
  Button,
  Heading,
  Pane,
  SelectField,
  Small,
  TextInputField,
  Alert,
} from 'evergreen-ui';
import { errorHandler } from '../../utils/error';
import { GameContext } from '../../context/GameContext';
import { TeamContext } from '../../context/TeamContext';
import { getGames, postGame, getGamesByType } from '../../api/game';
import {
  ERROR_RESET,
  ERROR_DB_MESSAGE,
  SUCCESS_GAME_REGISTER,
} from '../../utils/constants';

function Games() {
  const { teams, sports, resetTeam } = React.useContext(TeamContext);
  const { game, sport, setGame, setAllGames, setAllGamesByType } =
    React.useContext(GameContext);

  const [error, setError] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const handleSubmit = async () => {
    let { data: response } = await postGame(game);
    if (response.success) {
      const { data: responseGamesType } = await getGamesByType(sport);
      const { data: responseGames } = await getGames();

      // handle game type response
      if (responseGamesType.success) setAllGamesByType(responseGamesType.games);
      else errorHandler(ERROR_DB_MESSAGE, setError, responseGamesType.message);

      // handle game response
      if (responseGames.success) {
        setAllGames(responseGames.games);
        errorHandler(SUCCESS_GAME_REGISTER, setError);

        resetTeam();
        setTimeout(() => {
          errorHandler(ERROR_RESET, setError);
        }, 3000);
      } else {
        errorHandler(ERROR_DB_MESSAGE, setError, responseGames.message);
      }
    } else {
      // handle post game error
      errorHandler(ERROR_DB_MESSAGE, setError, response.message);
    }
  };

  const handleUpdate = () => {
    console.log('update');
  };

  return (
    <Pane display='flex' justifyContent='center'>
      <Pane className='form-container' alignSelf='center'>
        <Heading className='title-h2'>Adicionar Jogo</Heading>

        <Pane className='form-registration'>
          <Pane>
            <SelectField
              label='Time 1'
              name='teamAId'
              value={game.teamAId}
              onChange={(e) => setGame({ ...game, teamAId: e.target.value })}
            >
              <option value='' selected>
                ---
              </option>
              {teams &&
                teams.length > 0 &&
                teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
            </SelectField>
          </Pane>

          <Pane>
            <SelectField
              label='Time 2'
              name='teamB'
              value={game.teamBId}
              onChange={(e) => setGame({ ...game, teamBId: e.target.value })}
            >
              <option value='' selected>
                ---
              </option>
              {teams &&
                teams.length > 0 &&
                teams.map((team) => (
                  <option key={team._id} value={team._id}>
                    {team.name}
                  </option>
                ))}
            </SelectField>
          </Pane>

          <TextInputField
            type='datetime-local'
            label='Data e Hora do Jogo'
            value={game.createdAt}
            onChange={(e) => setGame({ ...game, createdAt: e.target.value })}
          />

          <Pane>
            <SelectField
              label='Esporte'
              name='type'
              onChange={(e) => setGame({ ...game, type: e.target.value })}
            >
              <option value='' selected>
                ---
              </option>
              {sports &&
                sports.length > 0 &&
                sports.map((sport) => (
                  <option key={sport._id} value={sport._id}>
                    {sport.name}
                  </option>
                ))}
            </SelectField>
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

        <Pane marginTop={16}>
          {error.status && (
            <Alert intent={error.type} title={error.title}>
              {error.message}
            </Alert>
          )}
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Games;
