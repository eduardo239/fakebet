import React from 'react';
import { Button, Heading, Pane } from 'evergreen-ui';
import '../css/bet.css';
import MyBetItem from './Bet/MyBetItem';

function MyBets({ data, setIsProfileShown, ...props }) {
  return (
    <Pane>
      <Heading size={300}>Minhas Apostas</Heading>
      <hr />
      <MyBetItem />
      <hr />
      <MyBetItem />
      <hr />
      <MyBetItem />
      <hr />

      <Pane display="flex" justifyContent="space-between" marginBottom={36}>
        <Heading size={400}>Total</Heading>
        <Heading size={400}>$324</Heading>
      </Pane>

      <Pane className="form-grid--field">
        <Pane display="flex" justifyContent="space-between">
          <Button appearance="primary">Salvar</Button>
          <Button appearance="minimal" onClick={() => setIsProfileShown(false)}>
            Sair
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default MyBets;
