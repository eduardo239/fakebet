import React from 'react';
import { Button, Heading, IconButton, Pane, TrashIcon } from 'evergreen-ui';
import '../css/bet.css';

function MyBets({ closeModal }) {
  return (
    <Pane>
      <Heading size={400}>Minhas Apostas</Heading>
      <hr />

      <Pane>
        <Pane display="flex" justifyContent="space-between" alignItems="center">
          <Heading size={200}>Team1 x Team2</Heading>
          <Heading size={200}>Valor: 4.30</Heading>
        </Pane>
        <Pane display="flex" justifyContent="space-between" alignItems="center">
          <Heading size={200}>My BET:</Heading>
          <Heading size={200}>Team1</Heading>
        </Pane>
        <IconButton icon={TrashIcon} intent="danger" />
      </Pane>
      <hr />

      <Pane>
        <Pane display="flex" justifyContent="space-between" alignItems="center">
          <Heading size={200}>Team1 x Team2</Heading>
          <Heading size={200}>Valor: 4.30</Heading>
        </Pane>
        <Pane display="flex" justifyContent="space-between" alignItems="center">
          <Heading size={200}>My BET:</Heading>
          <Heading size={200}>Team1</Heading>
        </Pane>
        <IconButton icon={TrashIcon} intent="danger" />
      </Pane>
      <hr />

      <Pane display="flex" justifyContent="space-between" marginBottom={36}>
        <Heading size={400}>Total</Heading>
        <Heading size={400}>$324</Heading>
      </Pane>

      <Pane display="flex" justifyContent="space-between">
        <Pane flex={1}>
          <Button width="100%" appearance="minimal" onClick={closeModal}>
            Cancelar
          </Button>
        </Pane>
        <Pane flex={1}>
          <Button width="100%" appearance="primary">
            Apostar
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default MyBets;
