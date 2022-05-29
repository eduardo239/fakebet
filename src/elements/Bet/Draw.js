import React from 'react';
import { Button, Heading, Pane, Small } from 'evergreen-ui';

function BetTeam({ showInput, odds }) {
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
        fontFamily="monospace"
        fontWeight={600}
      >
        {odds}
      </Button>
    </Pane>
  );
}

export default BetTeam;
