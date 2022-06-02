import React from 'react';
import Teams from './admin/TeamsForm';
import Games from './admin/GamesForm';
import TeamsTable from './admin/TeamsTable';
import { Pane } from 'evergreen-ui';
import { TIMES, JOGOS } from '../utils/constants';
import '../css/admin.css';
import '../css/table.css';
import { getTeams } from '../api/team';
import { TeamContext } from '../context/TeamContext';

function Type({ type, data }) {
  const { team, teams, setTeams } = React.useContext(TeamContext);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        let { data: response } = await getTeams();

        if (response.success) {
          setTeams(response.teams);
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
      {type === TIMES ? <Teams /> : type === JOGOS ? <Games /> : ''}

      {type === TIMES && teams && teams.length > 0 ? (
        <TeamsTable team={team} />
      ) : type === JOGOS ? (
        <Games />
      ) : (
        ''
      )}
    </Pane>
  );
}

export default Type;
