import React from 'react';
import { Button, Heading, Pane, Small } from 'evergreen-ui';

function BetTeam({ showInput }) {
  return (
    <Pane className="game-card--team">
      <Heading fontWeight="bold" size={800} className="light">
        VS
      </Heading>
      <Small>Empate</Small>
      <Button
        appearance="minimal"
        onClick={(e) => showInput(e, 'draw')}
        className="bg-light"
        width="100%"
      >
        3.23
      </Button>
    </Pane>
  );
}

export default BetTeam;
