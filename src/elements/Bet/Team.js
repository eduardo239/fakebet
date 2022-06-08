import React from 'react';
import { Button, Pane, Small } from 'evergreen-ui';

function BetTeam({ teamName, showInput, teamEmblem, odds, onClick }) {
  return (
    <Pane className='game-card--team'>
      <Pane onClick={onClick}>
        <img className='team-log--small' src={teamEmblem} alt={teamName} />
      </Pane>

      <Small>{teamName || 'null'}</Small>
      <Button
        appearance='minimal'
        onClick={(e) => showInput(e, teamName)}
        className='bg-light'
        width='100%'
        fontFamily='monospace'
        fontWeight={600}
      >
        {odds}
      </Button>
    </Pane>
  );
}

export default BetTeam;
