import React from 'react';
import Teams from './admin/Teams';
import Games from './admin/Games';
import TeamsTable from './admin/TeamsTable';
import { Pane } from 'evergreen-ui';
import { TIMES, JOGOS } from '../utils/constants';
import '../css/admin.css';
import '../css/table.css';
import { getTeams } from '../api/team';

function Type({ type, data }) {
  const [teams, setTeams] = React.useState([]);

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
      {type === TIMES ? (
        <TeamsTable data={teams} />
      ) : type === JOGOS ? (
        <Games />
      ) : (
        ''
      )}
    </Pane>
  );
}

export default Type;
