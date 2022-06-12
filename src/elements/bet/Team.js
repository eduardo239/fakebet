import React from 'react';
import { Button, Pane, Paragraph } from 'evergreen-ui';
import { EMBLEM_URL } from '../../utils/constants';

function BetTeam({ showInput, odds, onClick, team }) {
  return (
    <Pane className='game-card--team'>
      <Pane onClick={onClick}>
        <img
          className='team-logo--small'
          src={EMBLEM_URL + (team.emblem || 'default-team-logo.png')}
          alt={team.name}
        />
      </Pane>

      <Paragraph className='light'>{team.name || 'null'}</Paragraph>
      <Button
        appearance='minimal'
        onClick={(e) => showInput(e, team.name)}
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
