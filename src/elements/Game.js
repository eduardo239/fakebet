import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as MC } from '../assets/emblems/manchester-city-football-club.svg';
import { ReactComponent as RB } from '../assets/emblems/red-bull-bragantino.svg';

import {
  Button,
  Pane,
  Heading,
  Small,
  TextInput,
  Text,
  IconButton,
  SmallTickIcon,
  SmallCrossIcon,
  Alert,
} from 'evergreen-ui';
import '../css/game.css';
import '../css/message.css';

function ElGame({ game }) {
  const [showValue, setShowValue] = React.useState(false);
  const [odd, setOdd] = React.useState(1);
  const [pick, setPick] = React.useState(null);
  const [message, setMessage] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const betRef = React.useRef();

  const showInput = (e, pick) => {
    setShowValue(true);
    setOdd(e.target.innerText);
    setPick(pick);
  };

  const addBet = () => {
    let profit = odd * betRef.current.value;

    // eslint-disable-next-line
    let bet = {
      game: game.id,
      pick,
      value: betRef.current.value,
      odd,
      profit,
      createdAt: new Date(),
      win: null,
    };

    setMessage({
      title: 'Bet added',
      message: `You bet ${bet.value} on ${bet.pick}`,
      status: true,
      type: 'success',
    });

    setTimeout(() => {
      setShowValue(false);
      setMessage({
        title: '',
        message: '',
        status: false,
        type: '',
      });
    }, 2000);
  };

  const closeBet = () => {
    setShowValue(false);
    setMessage({
      title: '',
      message: '',
      status: false,
      type: '',
    });
  };

  return (
    <Pane className="games-grid">
      {message.status && (
        <Pane className={`message-top ${!!message.status ? 'fixed' : 'none'}`}>
          <Alert intent={message.type} title={message.title} marginBottom={32}>
            {message.message}
          </Alert>
        </Pane>
      )}
      <Pane className="game-card--container">
        <Pane
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
          paddingTop={16}
          paddingBottom={16}
        >
          <Pane className="game-card--team">
            <MC />
            <Small size={600}>{game.team1}</Small>
            <Button
              appearance="minimal"
              onClick={(e) => showInput(e, game.team1)}
              className="bg-light"
              width="100%"
            >
              1.34
            </Button>
          </Pane>
          <Pane className="game-card--team">
            <Heading
              size={600}
              marginBottom={16}
              fontWeight="bold"
              fontFamily="Courier"
              className="light"
            >
              VS
            </Heading>
            <Button
              appearance="minimal"
              onClick={(e) => showInput(e, 'draw')}
              className="bg-light"
              width="100%"
            >
              3.23
            </Button>
          </Pane>

          <Pane className="game-card--team">
            <RB />
            <Small size={600}>{game.team2}</Small>
            <Button
              appearance="minimal"
              onClick={(e) => showInput(e, game.team2)}
              className="bg-light"
              width="100%"
            >
              7.46
            </Button>
          </Pane>
        </Pane>

        <Pane position="relative">
          <Pane
            display={showValue ? 'flex' : 'none'}
            className="game-bet-value"
          >
            <TextInput
              name="text-input-name"
              placeholder="Valor..."
              type="number"
              ref={betRef}
            />
            <Pane className="icon">
              <IconButton
                icon={SmallTickIcon}
                onClick={addBet}
                intent="success"
              />
            </Pane>
            <Pane className="icon">
              <IconButton icon={SmallCrossIcon} onClick={closeBet} />
            </Pane>
          </Pane>
        </Pane>
        <Pane paddingBottom={16} paddingTop={16}>
          <Link to={`game/${game.type}/${game.id}`}>
            <Text size={300} className="light-alternate">
              Ver mais opções
            </Text>
          </Link>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default ElGame;
