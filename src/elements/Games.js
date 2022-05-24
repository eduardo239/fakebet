import React from 'react';
import { Pane, Heading } from 'evergreen-ui';
import { BASQUETE, ESPORTS, FUTEBOL } from '../utils/constants';
import Game from './Game';
import futebol from '../api/futebol.json';
import basquete from '../api/basquete.json';
import esports from '../api/esports.json';
import '../css/menu.css';
import '../css/game.css';

function ElGames({ type }) {
  return (
    <Pane>
      <Heading className="games-title">{type}</Heading>
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        {type === FUTEBOL
          ? futebol.map((game, index) => <Game key={index} game={game}></Game>)
          : type === BASQUETE
          ? basquete.map((game, index) => <Game key={index} game={game}></Game>)
          : type === ESPORTS
          ? esports.map((game, index) => <Game key={index} game={game}></Game>)
          : ''}
      </Pane>
    </Pane>
  );
}

export default ElGames;
