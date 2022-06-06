import React from 'react';
import GamesForm from './admin/GamesForm';
import TeamsForm from './admin/TeamsForm';
import SportsForm from './admin/SportsForm';
import TeamsTable from './admin/TeamsTable';
import GamesTable from './admin/GamesTable';
import { Pane } from 'evergreen-ui';
import { TIMES, JOGOS, ESPORTES } from '../utils/constants';
import '../css/table.css';

function Type({ type }) {
  return (
    <Pane>
      {type === TIMES && <TeamsForm />}
      {type === JOGOS && <GamesForm />}
      {type === ESPORTES && <SportsForm />}

      {type === TIMES && <TeamsTable />}
      {type === JOGOS && <GamesTable />}
    </Pane>
  );
}

export default Type;
