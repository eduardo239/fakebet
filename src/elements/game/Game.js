import React from 'react';
import BetTeam from '../bet/Team';
import BetDraw from '../bet/Draw';
import BetValue from '../bet/Input';
import { postBet } from '../../api/bet';
import { userEdit } from '../../api/user';
import { UserContext } from '../../context/UserContext';
import { GameContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from '../../utils/error';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { convertDateToFormat } from '../../utils/utils';
import { Pane, Alert, Paragraph } from 'evergreen-ui';
import {
  ERROR_DB_MESSAGE,
  ERROR_INSUFFICIENT_FUNDS,
  ERROR_INVALID_VALUE,
  ERROR_RESET,
  SUCCESS_BET,
} from '../../utils/constants';
import '../../css/game.css';

function ElementGame({ game }) {
  const navigate = useNavigate();
  const [, setUserLocalStorage] = useLocalStorage('user', null);
  const { sport } = React.useContext(GameContext);
  const { user, setUser } = React.useContext(UserContext);

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

    if (user.balance.amount < value) {
      errorHandler(ERROR_INSUFFICIENT_FUNDS, setMessage);
      return;
    }

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
        let updatedUser = {
          id: user._id,
          balance: {
            amount: user.balance.amount - value,
          },
        };
        // update user balance
        let { data: userResponse } = await userEdit(updatedUser);
        if (userResponse.success) {
          setUserLocalStorage(userResponse.user);
          setUser(userResponse.user);

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
        }
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
            team={game.teamAId}
            showInput={showInput}
            odds={parseFloat(game.teamAOdd).toFixed(2)}
          />

          <BetDraw
            showInput={showInput}
            odds={parseFloat((game.teamAOdd / game.teamBOdd) * 11).toFixed(2)}
          />

          <BetTeam
            onClick={() => onClick(game._id)}
            team={game.teamBId}
            showInput={showInput}
            odds={parseFloat(game.teamBOdd).toFixed(2)}
          />
        </Pane>

        <Pane marginBottom={8}>
          <Paragraph textAlign='center' className='small light-alternate-2'>
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
