import React, { useState } from 'react';
import { getGames, getGamesByType } from '../api/game';

const GameContext = React.createContext();
const GameProvider = GameContext.Provider;

const GameContextContent = ({ children }) => {
  const [game, setGame] = useState({
    teamAId: '',
    teamBId: '',
    teamAScore: 0,
    teamBScore: 0,
    teamAOdd: 0.0,
    teamBOdd: 0.0,
    createdAt: '',
    winner: '',
    type: '',
  });
  const [sport, setSport] = useState('');
  const [allGames, setAllGames] = useState([]);
  const [allGamesByType, setAllGamesByType] = useState([]);
  const [isGameUpdating, setGameIsUpdating] = React.useState(false);
  console.log(allGamesByType);

  const resetGame = () => {
    setGame({
      teamAId: '',
      teamBId: '',
      teamAScore: 0,
      teamBScore: 0,
      teamAOdd: 0.0,
      teamBOdd: 0.0,
      createdAt: '',
      winner: '',
      type: '',
    });
  };

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      (async () => {
        const { data: responseGamesType } = await getGamesByType(sport);
        const { data: responseGames } = await getGames();

        if (responseGamesType.success) {
          setAllGamesByType(responseGamesType.games);
        }
        if (responseGames.success) {
          setAllGames(responseGames.games);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [sport]);

  return (
    <GameProvider
      value={{
        game,
        allGamesByType,
        sport,
        allGames,
        isGameUpdating,
        setGame,
        setAllGamesByType,
        setSport,
        resetGame,
        setAllGames,
        setGameIsUpdating,
      }}
    >
      {children}
    </GameProvider>
  );
};

export { GameContext, GameContextContent };
