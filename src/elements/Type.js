import React from 'react';
import {
  IconButton,
  Pane,
  Table,
  SmallTickIcon,
  TrashIcon,
} from 'evergreen-ui';
import { TIMES, JOGOS } from '../utils/constants';
import Teams from './admin/Teams';
import Games from './admin/Games';
import '../css/admin.css';
import '../css/table.css';

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
  return (
    <Pane
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="100%"
    >
      {type === TIMES ? <Teams /> : type === JOGOS ? <Games /> : ''}

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
          {profiles.map((x) => (
            <Table.Row key={x.id} className="table-row">
              <Table.TextCell className="table-cell">{x.name}</Table.TextCell>
              <Table.TextCell className="table-cell">
                {x.lastActivity}
              </Table.TextCell>
              <Table.TextCell className="table-cell">{x.ltv}</Table.TextCell>
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
