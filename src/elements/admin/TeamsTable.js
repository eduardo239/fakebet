import React from 'react';
import {
  IconButton,
  Pane,
  Table,
  SmallTickIcon,
  TrashIcon,
} from 'evergreen-ui';

const URL_IMAGE = 'http://localhost:3003/images/emblems/';

function TeamsTable({ data }) {
  console.log(data);
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
          {data.map((x) => (
            <Table.Row key={x._id} className="table-row">
              <Table.TextCell className="table-cell">
                <img
                  className="image-small"
                  src={URL_IMAGE + (x.emblem || 'default')}
                  alt={x.name}
                />
              </Table.TextCell>
              <Table.TextCell className="table-cell">{x.name}</Table.TextCell>
              <Table.TextCell className="table-cell">{x.type}</Table.TextCell>
              <Table.TextCell className="table-cell">
                {x.shortName}
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

export default TeamsTable;
