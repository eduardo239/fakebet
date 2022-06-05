import React from 'react';
import Game from './Game';
import { Pane, Heading } from 'evergreen-ui';
import { GameContext } from '../context/GameContext';
import { uppercaseFirstLetter } from '../utils/utils';
import '../css/menu.css';
import '../css/game.css';

function ElementGames({ type }) {
  const { allGamesByTye } = React.useContext(GameContext);

  return (
    <Pane>
      <Heading className='games-title'>
        {uppercaseFirstLetter(type.name)}
      </Heading>
      <Pane
        display='flex'
        alignItems='flex-start'
        justifyContent='center'
        flexWrap='wrap'
      >
        {allGamesByTye &&
          allGamesByTye.length > 0 &&
          allGamesByTye.map((game, index) => (
            <Game key={index} game={game}></Game>
          ))}
      </Pane>
    </Pane>
  );
}

export default ElementGames;
