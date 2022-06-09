import React from 'react';
import BetTeam from './Bet/Team';
import BetDraw from './Bet/Draw';
import BetValue from './Bet/Input';
import { Pane, Alert, Paragraph } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import { errorHandler } from '../utils/error';
import {
  EMBLEM_URL,
  ERROR_DB_MESSAGE,
  ERROR_INVALID_VALUE,
  ERROR_RESET,
  SUCCESS_BET,
} from '../utils/constants';
import '../css/game.css';
import '../css/message.css';
import { convertDateToFormat, convertDateToMongoose } from '../utils/utils';
import { postBet } from '../api/bet';
import { UserContext } from '../context/UserContext';

function ElementGame({ game }) {
  const navigate = useNavigate();
  const { sport } = React.useContext(GameContext);
  const { user } = React.useContext(UserContext);

  const [showValue, setShowValue] = React.useState(false);
  const [odd, setOdd] = React.useState(1);
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [pick, setPick] = React.useState(null);
  const [message, setMessage] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const betRef = React.useRef();

  const showInput = (e, pick) => {
    setStartAnimation(true);
    setTimeout(() => {
      setShowValue(true);
    }, 250); // .25 from animation.css
    setOdd(e.target.innerText);
    setPick(pick);
  };

  const addBet = async () => {
    errorHandler(ERROR_RESET, setMessage);
    let value = betRef.current.value;
    let profit = odd * value;

    if (!user) {
      errorHandler(ERROR_RESET, setMessage);
      return;
    }
    let bet = {
      userId: user._id,
      gameId: game._id,
      pick,
      value: parseFloat(value),
      odd: parseFloat(odd),
      profit,
      win: false,
    };

    if (!isNaN(value) && value > 0 && value !== '' && !value.includes('e')) {
      // add a new bet
      let { data: response } = await postBet(bet);
      if (response.success) {
        errorHandler(
          SUCCESS_BET,
          setMessage,
          `Você apostou R$${bet.value} no time ${bet.pick}`
        );

        setTimeout(() => {
          setStartAnimation(false);
          setShowValue(false);
          errorHandler(ERROR_RESET, setMessage);

          betRef.current.value = '';
        }, 3000);
      } else {
        errorHandler(ERROR_DB_MESSAGE, setMessage, response.message);
      }
    } else {
      errorHandler(ERROR_INVALID_VALUE, setMessage);
      betRef.current.value = '';

      setTimeout(() => {
        errorHandler(ERROR_RESET, setMessage);
      }, 3000);
    }
  };

  const closeBet = () => {
    setShowValue(false);
    errorHandler(ERROR_RESET, setMessage);
  };

  const onClick = (id) => {
    navigate(`/all/${sport.name}/match/${id}`);
  };

  return (
    <Pane className='games-grid'>
      {message.status && (
        <Pane className={`message-top ${!!message.status ? 'fixed' : 'none'}`}>
          <Alert intent={message.type} title={message.title} marginBottom={32}>
            {message.message}
          </Alert>
        </Pane>
      )}
      <Pane
        className={`game-card--container ${
          startAnimation ? 'padding-bottom--54' : ''
        }`}
        paddingBottom={showValue ? '54px' : '0'}
      >
        <Pane
          display='flex'
          alignItems='flex-end'
          justifyContent='space-between'
          paddingTop={16}
          paddingBottom={4}
        >
          <BetTeam
            onClick={() => onClick(game._id)}
            teamName={game.teamAId.name}
            showInput={showInput}
            teamEmblem={EMBLEM_URL + (game.teamAId.emblem || 'default.png')}
            odds={parseFloat(game.teamAOdd).toFixed(2)}
          />

          <BetDraw
            showInput={showInput}
            odds={parseFloat((game.teamAOdd / game.teamBOdd) * 11).toFixed(2)}
          />

          <BetTeam
            onClick={() => onClick(game._id)}
            teamName={game.teamBId.name}
            showInput={showInput}
            teamEmblem={EMBLEM_URL + (game.teamBId.emblem || 'default.png')}
            odds={parseFloat(game.teamBOdd).toFixed(2)}
          />
        </Pane>

        <Pane marginBottom={8}>
          <Paragraph textAlign='center' className='small light-alternate'>
            {convertDateToFormat(game.createdAt)}
          </Paragraph>
        </Pane>

        <BetValue
          betRef={betRef}
          showValue={showValue}
          addBet={addBet}
          closeBet={closeBet}
        />
      </Pane>
    </Pane>
  );
}

export default ElementGame;
