import React from 'react';
import { Button, Pane, Small } from 'evergreen-ui';
import { Link } from 'react-router-dom';

function BetTeam({ teamName, gameId, gameType, showInput, TeamEmblem }) {
  return (
    <Pane className="game-card--team">
      <Link to={`game/${gameType}/${gameId}`}>
        <TeamEmblem />
      </Link>
      <Small>{teamName}</Small>
      <Button
        appearance="minimal"
        onClick={(e) => showInput(e, teamName)}
        className="bg-light"
        width="100%"
      >
        7.46
      </Button>
    </Pane>
  );
}

export default BetTeam;
