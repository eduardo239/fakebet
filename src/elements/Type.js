import React from 'react';
import GamesForm from './admin/GamesForm';
import TeamsForm from './admin/TeamsForm';
import TeamsTable from './admin/TeamsTable';
import GamesTable from './admin/GamesTable';
import { Pane } from 'evergreen-ui';
import { getTeams } from '../api/team';
import { getGames, getGamesByType } from '../api/game';
import { TeamContext } from '../context/TeamContext';
import { GameContext } from '../context/GameContext';
import { TIMES, JOGOS } from '../utils/constants';
import '../css/table.css';

function Type({ type }) {
  const { team, teams, setTeams } = React.useContext(TeamContext);
  const { game, games, setAllGames } = React.useContext(GameContext);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        const { data: responseGames } = await getGames();
        const { data: responseTeams } = await getTeams();

        if (responseGames.success) {
          setAllGames(responseGames.games);
        }
        if (responseTeams.success) {
          setTeams(responseTeams.teams);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Pane
      display='flex'
      flexDirection='column'
      justifyContent='center'
      width='100%'
    >
      {type === TIMES ? <TeamsForm /> : type === JOGOS ? <GamesForm /> : ''}

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
