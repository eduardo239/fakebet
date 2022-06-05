import React from 'react';
import Game from './Game';
import { GameContext } from '../context/GameContext';
import { Pane, Heading } from 'evergreen-ui';
import '../css/menu.css';
import '../css/game.css';

function ElGames({ type }) {
  const { games } = React.useContext(GameContext);

  return (
    <Pane>
      <Heading className='games-title'>{type}</Heading>
      <Pane
        display='flex'
        alignItems='flex-start'
        justifyContent='center'
        flexWrap='wrap'
      >
        {games &&
          games.length > 0 &&
          games.map((game, index) => <Game key={index} game={game}></Game>)}
      </Pane>
    </Pane>
  );
}

export default ElGames;
