import React from 'react';
import { Button, Pane, Heading } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import { ReactComponent as TeamShield } from '../assets/icons/ic_star.svg';
import '../css/game.css';

function HomeGamesItem() {
  const [value, setValue] = React.useState('');
  return (
    <Pane
      className="game-item"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Pane>
        <Link to="/game/123">
          <Pane
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            marginBottom={8}
          >
            <TeamShield></TeamShield>
            <Heading size={600}>VS</Heading>
            <TeamShield></TeamShield>
          </Pane>
        </Link>
        <Pane display="flex" alignItems="center" justifyContent="space-around">
          <Button appearance="minimal">1.34</Button>
          <Button appearance="minimal">3.23</Button>
          <Button appearance="minimal">7.46</Button>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default HomeGamesItem;
