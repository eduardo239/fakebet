import React from 'react';
import Game from './Game';
import { Pane, Heading } from 'evergreen-ui';
import { GameContext } from '../../context/GameContext';
import { uppercaseFirstLetter } from '../../utils/utils';
import '../../css/menu.css';
import '../../css/game.css';

function ElementGames({ type }) {
  const { allGamesPerPage } = React.useContext(GameContext);

  return (
    <Pane>
      <Heading className='title-h1 light'>{uppercaseFirstLetter(type)}</Heading>
      <Pane className='flex-start-center  flex-wrap'>
        {allGamesPerPage.length > 0 ? (
          allGamesPerPage.map((game, index) => (
            <Game key={index} game={game}></Game>
          ))
        ) : (
          <Pane>Jogos não encontrados</Pane>
        )}
      </Pane>
    </Pane>
  );
}

export default ElementGames;
