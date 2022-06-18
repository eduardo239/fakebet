import React from 'react';
import BetItem from '../bet/Item';
import { Heading, Pane } from 'evergreen-ui';

function MyBets({ bets, setIsProfileShown, handleRemoveBet, ...props }) {
  const [totalProfit, setTotalProfit] = React.useState(0);
  const [totalValue, setTotalValue] = React.useState(0);

  React.useEffect(() => {
    if (bets.length > 0) {
      setTotalValue(bets.reduce((a, b) => a + b.value, 0));
      setTotalProfit(bets.reduce((a, b) => a + b.profit, 0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bets, setTotalValue]);

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
        <hr />
        <Pane display='flex' justifyContent='space-between' margin={16}>
          <Heading size={400}>Total Aposta</Heading>
          <Heading size={400} fontFamily='monospace'>
            R${totalValue.toFixed(2)}
          </Heading>
        </Pane>
        <Pane display='flex' justifyContent='space-between' margin={16}>
          <Heading size={400}>Total Profit</Heading>
          <Heading size={400} fontFamily='monospace'>
            R${totalProfit.toFixed(2)}
          </Heading>
        </Pane>
      </Pane>
    );
  else return <Pane className='dark'>Nenhum Aposta encontrada</Pane>;
}

export default MyBets;
