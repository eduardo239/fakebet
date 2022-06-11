import React from 'react';
import { TeamContext } from '../../context/TeamContext';
import { removeTeam } from '../../api/team';
import { Pane, Table, Dialog, Button, Paragraph } from 'evergreen-ui';

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

  return (
    <Pane
      width='100%'
      display='flex'
      flexDirection='column'
      justifyContent='center'
    >
      <Table className='table'>
        <Table.Head>
          <Table.TextHeaderCell>Emblema</Table.TextHeaderCell>
          <Table.TextHeaderCell>id</Table.TextHeaderCell>
          <Table.TextHeaderCell>Nome</Table.TextHeaderCell>
          <Table.TextHeaderCell>Esporte</Table.TextHeaderCell>
          <Table.TextHeaderCell>Abreviação</Table.TextHeaderCell>
          <Table.TextHeaderCell>Remover</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {teams &&
            teams.length > 0 &&
            teams.map((item) => (
              <Table.Row
                className={`${
                  team && item._id === team._id ? 'selected' : ''
                } table-row`}
                key={item._id}
                height={40}
                isSelectable
                onSelect={() => handleSelect(item)}
              >
                <Table.TextCell>
                  <img
                    className='table-icon--small'
                    src={URL_IMAGE + (item.emblem || 'default-team-logo.png')}
                    alt={item.name}
                  />
                </Table.TextCell>
                <Table.TextCell>{item._id}</Table.TextCell>
                <Table.TextCell>{item.name}</Table.TextCell>
                <Table.TextCell>
                  {item.type ? item.type.name : 'null'}
                </Table.TextCell>
                <Table.TextCell>{item.shortName}</Table.TextCell>

                <Table.TextCell>
                  <Button
                    appearance='primary'
                    intent='danger'
                    onClick={() => setIsShownDeleteModal(true)}
                  >
                    Remover
                  </Button>
                </Table.TextCell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>

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
