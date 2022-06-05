import React from 'react';
import { Button, Pane, Small } from 'evergreen-ui';
import { Link } from 'react-router-dom';

function BetTeam({ teamName, gameId, gameType, showInput, teamEmblem, odds }) {
  return (
    <Pane className='game-card--team'>
      <Link to={`game/${gameType}/${gameId}`}>
        <img className='team-log--small' src={teamEmblem} alt={teamName} />
      </Link>
      <Small>{teamName}</Small>
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
