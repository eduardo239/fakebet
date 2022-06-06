import React from 'react';
import Game from './Game';
import { Pane, Heading } from 'evergreen-ui';
import { GameContext } from '../context/GameContext';
import '../css/menu.css';
import '../css/game.css';

function ElementGames({ type }) {
  const { allGamesByType } = React.useContext(GameContext);
  console.log(type);

  return (
    <Pane>
      <Heading className='games-title'>
        {`uppercaseFirstLetter(allGamesByType[0].type.name)`}
      </Heading>
      <Pane
        display='flex'
        alignItems='flex-start'
        justifyContent='center'
        flexWrap='wrap'
      >
        {allGamesByType &&
          allGamesByType.length > 0 &&
          allGamesByType.map((game, index) => (
            <Game key={index} game={game}></Game>
          ))}
      </Pane>
    </Pane>
  );
}

export default ElementGames;
