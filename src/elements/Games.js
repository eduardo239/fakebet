import React from 'react';
import Game from './Game';
import { Pane, Heading, Spinner } from 'evergreen-ui';
import { GameContext } from '../context/GameContext';
import { uppercaseFirstLetter } from '../utils/utils';
import '../css/menu.css';
import '../css/game.css';

function ElementGames({ type }) {
  const { allGamesPagination, isLoadingGamesByType } =
    React.useContext(GameContext);

  return (
    <Pane>
      <Heading className='games-title'>{uppercaseFirstLetter(type)}</Heading>
      <Pane
        display='flex'
        alignItems='flex-start'
        justifyContent='center'
        flexWrap='wrap'
      >
        {isLoadingGamesByType ? (
          <Pane
            display='flex'
            alignItems='center'
            justifyContent='center'
            height={400}
          >
            <Spinner />
          </Pane>
        ) : (
          allGamesPagination &&
          allGamesPagination.length > 0 &&
          allGamesPagination.map((game, index) => (
            <Game key={index} game={game}></Game>
          ))
        )}
      </Pane>
    </Pane>
  );
}

export default ElementGames;
