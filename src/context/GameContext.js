import React, { useState } from 'react';
import { getGamesByType } from '../api/game';

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
  const [allGames, setAllGames] = useState([]);
  const [games, setGames] = useState([]);
  const [sport, setSport] = useState('futebol');
  const [isGameUpdating, setGameIsUpdating] = React.useState(false);

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
        const { data: response } = await getGamesByType(sport);
        console.log(response);
        if (response.success) {
          setGames(response.games);
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
        games,
        sport,
        allGames,
        isGameUpdating,
        setGame,
        setGames,
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
