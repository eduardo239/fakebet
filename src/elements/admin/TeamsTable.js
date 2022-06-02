import React from 'react';
import { Pane, Table, Dialog, Button, Paragraph } from 'evergreen-ui';
import { TeamContext } from '../../context/TeamContext';
import { removeTeam } from '../../api/team';

const URL_IMAGE = 'http://localhost:3003/images/emblems/';

function TeamsTable() {
  const { team, teams, setTeam, setTeams } = React.useContext(TeamContext);
  const [isShown, setIsShown] = React.useState(false);

  const handleSelect = (team) => {
    setTeam(team);
  };

  const iShownDeleteDialog = (id) => {
    setIsShown(true);
  };

  const handleEdit = (id) => {
    // TODO: implementar
  };

  const handleDelete = async () => {
    await removeTeam(team._id);
    // TODO: implementar error
    const newData = teams.filter((item) => item._id !== team._id);

    setTeams(newData);
    setIsShown(false);
  };

  return (
    <Pane
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="100%"
    >
      <Table className="table">
        <Table.Head>
          <Table.TextHeaderCell>Emblema</Table.TextHeaderCell>
          <Table.TextHeaderCell>Nome</Table.TextHeaderCell>
          <Table.TextHeaderCell>Gênero</Table.TextHeaderCell>
          <Table.TextHeaderCell>Abreviação</Table.TextHeaderCell>
          <Table.TextHeaderCell>Remover</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {teams.map((item) => (
            <Table.Row
              className={`${item._id === team._id ? 'selected' : ''} table-row`}
              key={item.id}
              isSelectable
              onSelect={() => handleSelect(item)}
              height={40}
            >
              <Table.TextCell>
                <img
                  className="image-small"
                  src={URL_IMAGE + (item.emblem || 'default.png')}
                  alt={item.name}
                />
              </Table.TextCell>
              <Table.TextCell>{item.name}</Table.TextCell>
              <Table.TextCell>{item.type}</Table.TextCell>
              <Table.TextCell>{item.shortName}</Table.TextCell>
              <Table.TextCell>
                <Button
                  appearance="primary"
                  intent="danger"
                  onClick={iShownDeleteDialog}
                >
                  Remover
                </Button>
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Dialog
        isShown={isShown}
        title="Remover Time"
        intent="danger"
        cancelLabel="Cancelar"
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Remover"
        onConfirm={() => handleDelete()}
      >
        <Paragraph size={300} marginTop={12}>
          Você tem certeza que deseja remover o time {team.name}?
        </Paragraph>
      </Dialog>
    </Pane>
  );
}

export default TeamsTable;
