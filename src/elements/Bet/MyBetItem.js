import React from 'react';
import { Heading, IconButton, Pane, TrashIcon } from 'evergreen-ui';

function MyBetItem() {
  return (
    <Pane display="flex" alignItems="center" gap={8}>
      <Pane className="form-grid" flex={1}>
        <Heading size={200}>Team1 x Team2</Heading>
        <Heading size={200} textAlign="right">
          Valor: 4.30
        </Heading>

        <Heading size={200}>My BET:</Heading>
        <Heading size={200} textAlign="right">
          Team1
        </Heading>
      </Pane>

      <IconButton icon={TrashIcon} intent="danger" />
    </Pane>
  );
}

export default MyBetItem;
