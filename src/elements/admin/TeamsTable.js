import React from 'react';
import {
  IconButton,
  Pane,
  Table,
  SmallTickIcon,
  TrashIcon,
  Dialog,
} from 'evergreen-ui';
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
      <Table className="table" marginTop={16}>
        <Table.Head className="table-row">
          <Table.TextHeaderCell className="table-cell">
            Name
          </Table.TextHeaderCell>
          <Table.TextHeaderCell className="table-cell">
            Last Activity
          </Table.TextHeaderCell>
          <Table.TextHeaderCell className="table-cell">
            ltv
          </Table.TextHeaderCell>
          <Table.TextHeaderCell className="table-cell-icon">
            Save
          </Table.TextHeaderCell>
          <Table.TextHeaderCell className="table-cell-icon">
            Remove
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body>
          {teams.map((x) => (
            <Table.Row
              key={x._id}
              className="table-row"
              onClick={() => handleSelect(x)}
            >
              <Table.TextCell className="table-cell">
                <img
                  className="image-small"
                  src={URL_IMAGE + (x.emblem || 'default.png')}
                  alt={x.name}
                />
              </Table.TextCell>
              <Table.TextCell className="table-cell">{x.name}</Table.TextCell>
              <Table.TextCell className="table-cell">{x.type}</Table.TextCell>
              <Table.TextCell className="table-cell">
                {x.shortName}
              </Table.TextCell>
              <Table.TextCell className="table-cell-icon">
                <IconButton
                  disabled={team && team._id !== x._id}
                  onClick={() => handleEdit(x)}
                  icon={SmallTickIcon}
                  intent="success"
                />
              </Table.TextCell>
              <Table.TextCell className="table-cell-icon">
                <IconButton
                  disabled={team && team._id !== x._id}
                  onClick={() => iShownDeleteDialog(x)}
                  icon={TrashIcon}
                  intent="danger"
                />
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Dialog
        isShown={isShown}
        title="Dialog title"
        intent="danger"
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Delete"
        onConfirm={() => handleDelete()}
      >
        Are you sure you want to delete this item?
      </Dialog>
    </Pane>
  );
}

export default TeamsTable;
