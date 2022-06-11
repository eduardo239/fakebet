import React from 'react';
import MyBetItem from './Bet/MyBetItem';
import { Heading, Pane } from 'evergreen-ui';
import '../css/bet.css';

function MyBets({ bets, setIsProfileShown, handleRemoveBet, ...props }) {
  return (
    <Pane>
      {bets &&
        bets.length > 0 &&
        bets.map((bet) => (
          <MyBetItem
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
}

export default MyBets;
