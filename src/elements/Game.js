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

  const betRef = React.useRef();

  const handleShowInput = () => {
    setShowValue(true);
  };

  const handleAddBet = () => {
    setTimeout(() => {
      setShowValue(false);
    }, 2000);
  };

  const handleCloseBet = () => {
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
            <Button appearance="minimal" onClick={handleShowInput}>
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
            <Button appearance="minimal" onClick={handleShowInput}>
              3.23
            </Button>
          </Pane>

          <Pane className="game-item-team">
            <TeamShield></TeamShield>
            <Small size={600}>{game.team2}</Small>
            <Button appearance="minimal" onClick={handleShowInput}>
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
                onClick={handleAddBet}
                intent="success"
              />
            </Pane>
            <Pane className="icon">
              <IconButton icon={SmallCrossIcon} onClick={handleCloseBet} />
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
