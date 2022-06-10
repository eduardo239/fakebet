import React from 'react';
import MyBetItem from './Bet/MyBetItem';
import { Button, Heading, Pane } from 'evergreen-ui';
import '../css/bet.css';

function MyBets({ bets, setIsProfileShown, ...props }) {
  return (
    <Pane>
      <Heading size={300}>Minhas Apostas</Heading>
      <hr />
      <MyBetItem />
      {bets &&
        bets.length > 0 &&
        bets.map((bet) => <MyBetItem key={bet._id} bet={bet} />)}

      <Pane display='flex' justifyContent='space-between' marginBottom={36}>
        <Heading size={400}>Total</Heading>
        <Heading size={400}>$324</Heading>
      </Pane>

      <Pane className='form-grid--field'>
        <Pane display='flex' justifyContent='space-between'>
          <Button appearance='primary'>Salvar</Button>
          <Button appearance='minimal' onClick={() => setIsProfileShown(false)}>
            Sair
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default MyBets;
