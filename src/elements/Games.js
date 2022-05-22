import React from 'react';
import { Pane, Heading } from 'evergreen-ui';
import { BASQUETE, ESPORTS, FUTEBOL } from '../utils/constants';
import Game from './Game';
import futebol from '../futebol.json';
import basquete from '../basquete.json';
import esports from '../esports.json';
import '../css/menu.css';

function HomeGames({ type }) {
  return (
    <Pane>
      <Heading size={700} marginTop={16} marginBottom={16} textAlign="center">
        {type}
      </Heading>
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

export default HomeGames;
