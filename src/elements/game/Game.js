import React from 'react';
import BetValue from '../bet/Input';
import { postBet } from '../../api/bet';
import { userEdit } from '../../api/user';
import { UserContext } from '../../context/UserContext';
import { GameContext } from '../../context/GameContext';
import { useNavigate } from 'react-router-dom';
import { errorHandler } from '../../utils/error';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Pane, Alert, Small, Heading } from 'evergreen-ui';
import {
  DRAW_STATE,
  ERROR_DB_MESSAGE,
  ERROR_INSUFFICIENT_FUNDS,
  ERROR_INVALID_VALUE,
  ERROR_RESET,
  SUCCESS_BET,
} from '../../utils/constants';
import '../../css/game.css';
import GameLogo from './GameLogo';
import GameName from './GameName';
import GameNameDraw from './GameNameDraw';
import GameButton from './GameButton';
import GameLogoDraw from './GameLogoDraw';
import GameToday from './GameToday';

function ElementGame({ game }) {
  const navigate = useNavigate();
  const { sport } = React.useContext(GameContext);
  const { user, setUser } = React.useContext(UserContext);
  const [, setUserLocalStorage] = useLocalStorage('user', null);

  const [odd, setOdd] = React.useState(1);
  const [pick, setPick] = React.useState(null);
  const [showValue, setShowValue] = React.useState(false);
  const [message, setMessage] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const betRef = React.useRef();

  const showInput = (e, pick) => {
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

  const handleMatchClick = (id) => {
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
      {/* new */}

      <Pane className='game-item' paddingBottom={showValue ? '38px' : '0'}>
        <Pane margin={1} padding={18}>
          <table width='100%'>
            <tbody>
              <tr
                style={{ verticalAlign: 'middle', textAlign: 'center' }}
                onClick={() => handleMatchClick(game._id)}
              >
                <GameLogo team={game.teamAId} />
                <GameLogoDraw />
                <GameLogo team={game.teamBId} />
              </tr>
              <tr>
                <GameName team={game.teamAId} />
                <GameNameDraw />
                <GameName team={game.teamBId} />
              </tr>
              <tr>
                <GameButton
                  team={game.teamAId}
                  odd={game.teamAOdd}
                  showInput={showInput}
                />

                <GameButton
                  team={DRAW_STATE}
                  odd={game.teamAOdd * game.teamBOdd}
                  showInput={showInput}
                />

                <GameButton
                  team={game.teamBId}
                  odd={game.teamBOdd}
                  showInput={showInput}
                />
              </tr>
              <tr>
                <td colSpan={3}>
                  <Heading size={100}>ID: {game._id.toUpperCase()}</Heading>
                </td>
              </tr>
            </tbody>
          </table>

          <BetValue
            betRef={betRef}
            showValue={showValue}
            addBet={addBet}
            closeBet={closeBet}
          />

          <GameToday game={game} />
        </Pane>
      </Pane>
    </Pane>
  );
}

export default ElementGame;
