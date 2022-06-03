import React from 'react';
import GamesForm from './admin/GamesForm';
import TeamsForm from './admin/TeamsForm';
import TeamsTable from './admin/TeamsTable';
import GamesTable from './admin/GamesTable';
import { Pane } from 'evergreen-ui';
import { getTeams } from '../api/team';
import { getGames } from '../api/game';
import { TeamContext } from '../context/TeamContext';
import { GameContext } from '../context/GameContext';
import { TIMES, JOGOS } from '../utils/constants';
import '../css/table.css';

function Type({ type, data }) {
  const { team, teams, setTeams } = React.useContext(TeamContext);
  const { game, games, setGames } = React.useContext(GameContext);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        let { data: responseTeams } = await getTeams();
        let { data: responseGames } = await getGames();

        if (responseTeams.success) {
          setTeams(responseTeams.teams);
        }

        if (responseGames.success) {
          setGames(responseGames.games);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Pane
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="100%"
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
