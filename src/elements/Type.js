import {
  IconButton,
  Pane,
  Table,
  SmallTickIcon,
  TrashIcon,
  TextInputField,
  Button,
} from 'evergreen-ui';
import React from 'react';
import '../css/table.css';
import '../css/admin.css';

const profiles = [
  {
    id: 1,
    name: 'John Doe',
    lastActivity: '2 days ago',
    ltv: '$1,000',
  },
  {
    id: 2,
    name: 'Jane Doe',
    lastActivity: '3 days ago',
    ltv: '$2,000',
  },
];

function Type({ type, data }) {
  const [name, setName] = React.useState('');
  const [gameType, setGameType] = React.useState('');
  const [emblem, setEmblem] = React.useState('');
  const [shortName, setShortName] = React.useState('');

  return (
    <Pane
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="100%"
    >
      <Pane padding={32} className="admin-form">
        <Pane className="admin-form-col">
          <TextInputField
            label="Team name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInputField
            label="Game type"
            placeholder="Futebol, Basquete .."
            value={gameType}
            onChange={(e) => setGameType(e.target.value)}
          />
        </Pane>
        <Pane className="admin-form-col">
          <TextInputField
            label="Emblem"
            placeholder="URL from team emblem"
            value={emblem}
            onChange={(e) => setEmblem(e.target.value)}
          />
          <TextInputField
            label="Short name"
            placeholder="XTQ"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />
          <Button appearance="primary">Save</Button>
        </Pane>
      </Pane>
      <Table className="table">
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
          {profiles.map((x) => (
            <Table.Row key={x.id} className="table-row">
              <Table.TextCell className="table-cell">{x.name}</Table.TextCell>
              <Table.TextCell className="table-cell">
                {x.lastActivity}
              </Table.TextCell>
              <Table.TextCell className="table-cell" isNumber>
                {x.ltv}
              </Table.TextCell>
              <Table.TextCell className="table-cell-icon">
                <IconButton icon={SmallTickIcon} intent="success" />
              </Table.TextCell>
              <Table.TextCell className="table-cell-icon">
                <IconButton icon={TrashIcon} intent="danger" />
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  );
}

export default Type;
