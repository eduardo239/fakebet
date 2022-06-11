import React from 'react';
import BetItem from '../bet/Item';
import { Heading, Pane } from 'evergreen-ui';

function MyBets({ bets, setIsProfileShown, handleRemoveBet, ...props }) {
  if (bets.length > 0)
    return (
      <Pane>
        {bets &&
          bets.length > 0 &&
          bets.map((bet) => (
            <BetItem
              key={bet._id}
              bet={bet}
              handleRemoveBet={handleRemoveBet}
            />
          ))}

        <Pane display='flex' justifyContent='space-between' margin={16}>
          <Heading size={400}>Total</Heading>
          <Heading size={400}>$324</Heading>
        </Pane>
      </Pane>
    );
  else return <Pane className='dark'>Nenhum Aposta encontrada</Pane>;
}

export default MyBets;
