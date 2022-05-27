import React from "react";
import { ReactComponent as MC } from "../assets/emblems/manchester-city-football-club.svg";
import { ReactComponent as RB } from "../assets/emblems/red-bull-bragantino.svg";

import { Pane, Alert } from "evergreen-ui";
import "../css/game.css";
import "../css/message.css";
import BetTeam from "./Bet/Team";
import BetDraw from "./Bet/Draw";
import BetValue from "./Bet/Input";

function ElGame({ game }) {
  const [showValue, setShowValue] = React.useState(false);
  const [odd, setOdd] = React.useState(1);
  const [startAnimation, setStartAnimation] = React.useState(false);
  const [pick, setPick] = React.useState(null);
  const [message, setMessage] = React.useState({
    title: "",
    message: "",
    status: false,
    type: "",
  });

  const betRef = React.useRef();

  const showInput = (e, pick) => {
    setStartAnimation(true);
    setTimeout(() => {
      setShowValue(true);
    }, 250); // FIXME: .25 from animation.css
    setOdd(e.target.innerText);
    setPick(pick);
  };

  const addBet = () => {
    let value = betRef.current.value;
    let profit = odd * value;

    let bet = {
      game: game.id,
      pick,
      value,
      odd,
      profit,
      createdAt: new Date(),
      win: null,
    };

    if (!isNaN(value) && value > 0 && value !== "" && !value.includes("e")) {
      setMessage({
        title: "Você apostou",
        message: `Você apostou ${bet.value} no ${bet.pick}`,
        status: true,
        type: "success",
      });
    } else {
      setMessage({
        title: "Aviso",
        message: "Valor inválido, tente novamente",
        status: true,
        type: "warning",
      });
    }

    setTimeout(() => {
      setStartAnimation(false);
      setShowValue(false);
      setMessage({
        title: "",
        message: "",
        status: false,
        type: "",
      });
      betRef.current.value = "";
    }, 2000);
  };

  const closeBet = () => {
    setShowValue(false);
    setMessage({
      title: "",
      message: "",
      status: false,
      type: "",
    });
  };

  return (
    <Pane className="games-grid">
      {message.status && (
        <Pane className={`message-top ${!!message.status ? "fixed" : "none"}`}>
          <Alert intent={message.type} title={message.title} marginBottom={32}>
            {message.message}
          </Alert>
        </Pane>
      )}
      <Pane
        className={`game-card--container ${
          startAnimation ? "padding-bottom--54" : ""
        }`}
        paddingBottom={showValue ? "54px" : "0"}
      >
        <Pane
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
          paddingTop={16}
          paddingBottom={16}
        >
          <BetTeam
            teamName={game.team1}
            gameId={game.id}
            gameType={game.type}
            showInput={showInput}
            TeamEmblem={MC}
            odds={game.odds.team1}
          />

          <BetDraw showInput={showInput} odds={game.odds.draw} />

          <BetTeam
            teamName={game.team2}
            gameId={game.id}
            gameType={game.type}
            showInput={showInput}
            TeamEmblem={RB}
            odds={game.odds.team2}
          />
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

export default ElGame;
