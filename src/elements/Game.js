import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as TeamShield } from '../assets/icons/ic_star.svg';

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
} from 'evergreen-ui';
import '../css/game.css';

function HomeGamesItem({ game }) {
  const [showValue, setShowValue] = React.useState(false);
  const [odd, setOdd] = React.useState(1);
  const [pick, setPick] = React.useState(null);

  const betRef = React.useRef();

  const showInput = (e, pick) => {
    setShowValue(true);
    setOdd(e.target.innerText);
    setPick(pick);
  };

  const addBet = () => {
    let profit = odd * betRef.current.value;

    console.log({
      game: game.id,
      pick,
      value: betRef.current.value,
      odd,
      profit,
      createdAt: new Date(),
      win: null,
    });

    setTimeout(() => {
      setShowValue(false);
    }, 2000);
  };

  const closeBet = () => {
    setShowValue(false);
  };

  return (
    <Pane className="game-item">
      <Pane>
        <Pane
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
          paddingTop={16}
          paddingBottom={16}
          paddingLeft={4}
          paddingRight={4}
        >
          <Pane className="game-item-team">
            <TeamShield></TeamShield>
            <Small size={600}>{game.team1}</Small>
            <Button
              appearance="minimal"
              onClick={(e) => showInput(e, game.team1)}
            >
              1.34
            </Button>
          </Pane>
          <Pane className="game-item-team">
            <Heading
              size={600}
              marginBottom={16}
              fontWeight="bold"
              fontFamily="Courier"
            >
              VS
            </Heading>
            <Button appearance="minimal" onClick={(e) => showInput(e, 'draw')}>
              3.23
            </Button>
          </Pane>

          <Pane className="game-item-team">
            <TeamShield></TeamShield>
            <Small size={600}>{game.team2}</Small>
            <Button
              appearance="minimal"
              onClick={(e) => showInput(e, game.team2)}
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
            <Text size={300}>Ver mais opções</Text>
          </Link>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default HomeGamesItem;
