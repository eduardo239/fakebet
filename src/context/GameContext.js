import React, { useState } from 'react';

const GameContext = React.createContext();

const GameProvider = GameContext.Provider;

const GameContextContent = ({ children }) => {
  const [game, setGame] = useState({
    teamAId: '',
    teamBId: '',
    teamAScore: 0,
    teamBScore: 0,
    createdAt: '',
    winner: '',
    type: '',
  });
  const [games, setGames] = useState(null);
  const [isGameUpdating, setGameIsUpdating] = React.useState(false);

  const resetGame = () => {
    setGame({});
  };

  return (
    <GameProvider
      value={{
        game,
        games,
        setGame,
        setGames,
        resetGame,
        isGameUpdating,
        setGameIsUpdating,
      }}
    >
      {children}
    </GameProvider>
  );
};

export { GameContext, GameContextContent };
