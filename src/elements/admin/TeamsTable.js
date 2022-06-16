import React from 'react';
import { TeamContext } from '../../context/TeamContext';
import { getTeams, removeTeam } from '../../api/team';
import { Pane, Dialog, Button, Paragraph } from 'evergreen-ui';
import '../../css/table.css';

const URL_IMAGE = 'http://localhost:3003/images/emblems/';

function TeamsTable() {
  const { team, teams, setTeam, setTeams, setIsUpdating } =
    React.useContext(TeamContext);

  const [isShownDeleteModal, setIsShownDeleteModal] = React.useState(false);

  const handleSelect = (team) => {
    setTeam(team);
    setIsUpdating(true);
  };

  const handleDelete = async () => {
    await removeTeam(team._id);
    const newData = teams.filter((item) => item._id !== team._id);

    setTeams(newData);
    setIsShownDeleteModal(false);
    setIsUpdating(false);
  };

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      (async () => {
        const { data: responseTeams } = await getTeams();
        if (responseTeams.success) {
          setTeams(responseTeams.teams);
        }
      })();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Pane className='flex-column-center-100'>
      <table>
        <thead>
          <tr>
            <th>Emblem</th>
            <th>Name</th>
            <th>Short Name</th>
            <th
              style={{
                textAlign: 'center',
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {teams.length > 0 &&
            teams.map((team) => (
              <tr
                onClick={() => handleSelect(team)}
                key={team._id}
                style={{ borderBottom: '1px dashed var(--dark-alternate-2)' }}
              >
                <td
                  style={{
                    verticalAlign: 'middle',
                    background: '#aaa',
                    width: '60px',
                    textAlign: 'center',
                  }}
                >
                  <img
                    className='table-icon--small'
                    src={`${URL_IMAGE}${
                      team?.emblem ? team.emblem : 'default-team-logo.png'
                    }`}
                    alt={team.name}
                  />
                </td>
                <td style={{ paddingLeft: '8px' }}>{team.name}</td>
                <td style={{ paddingLeft: '8px' }}>{team.shortName}</td>
                <td
                  style={{
                    width: '75px',
                    textAlign: 'center',
                  }}
                >
                  <Button
                    appearance='primary'
                    intent='danger'
                    onClick={() => setIsShownDeleteModal(true)}
                    marginRight={8}
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Dialog
        isShown={isShownDeleteModal}
        title='Remover Time'
        intent='danger'
        cancelLabel='Cancelar'
        onCloseComplete={() => setIsShownDeleteModal(false)}
        confirmLabel='Remover'
        onConfirm={() => handleDelete()}
      >
        <Paragraph size={300} marginTop={12}>
          Você tem certeza que deseja remover o time {team ? team.name : '.'}?
        </Paragraph>
      </Dialog>
    </Pane>
  );
}

export default TeamsTable;
