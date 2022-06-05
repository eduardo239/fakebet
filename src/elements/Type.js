import React from 'react';
import GamesForm from './admin/GamesForm';
import TeamsForm from './admin/TeamsForm';
import SportsForm from './admin/SportsForm';
import TeamsTable from './admin/TeamsTable';
import GamesTable from './admin/GamesTable';
import { Pane } from 'evergreen-ui';
import { TeamContext } from '../context/TeamContext';
import { GameContext } from '../context/GameContext';
import { TIMES, JOGOS, ESPORTES } from '../utils/constants';
import '../css/table.css';

function Type({ type }) {
  const { team, teams } = React.useContext(TeamContext);
  const { game, games } = React.useContext(GameContext);

  return (
    <Pane
      display='flex'
      flexDirection='column'
      justifyContent='center'
      width='100%'
    >
      {type === TIMES ? (
        <TeamsForm />
      ) : type === JOGOS ? (
        <GamesForm />
      ) : type === ESPORTES ? (
        <SportsForm />
      ) : null}

      {type === TIMES && teams && teams.length > 0 ? (
        <TeamsTable team={team} />
      ) : type === JOGOS && games && games.length > 0 ? (
        <GamesTable game={game} />
      ) : (
        ''
      )}
    </Pane>
  );
}

export default Type;
