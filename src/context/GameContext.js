import React, { useState } from 'react';
import { getGames, getGamesByPagination, getGamesByType } from '../api/game';

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
  const [sport, setSport] = useState('futebol');
  const [allGames, setAllGames] = useState([]);
  const [allGamesByType, setAllGamesByType] = useState([]);
  const [allGamesPagination, setAllGamesPagination] = useState([]);
  const [isGameUpdating, setGameIsUpdating] = React.useState(false);
  const [isLoadingGames, setIsLoadingGames] = React.useState(false);
  const [page, setPage] = useState(1);
  const [isLoadingGamesByType, setIsLoadingGamesByType] = React.useState(false);
  const [isLoadingGamesPagination, setIsLoadingPagination] =
    React.useState(false);

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
        setIsLoadingGamesByType(true);
        const { data: responseGamesType } = await getGamesByType(sport);
        if (responseGamesType.success) {
          setAllGamesByType(responseGamesType.games);
        }

        setIsLoadingGames(true);
        const { data: responseGames } = await getGames();
        if (responseGames.success) {
          setAllGames(responseGames.games);
        }

        setIsLoadingGamesByType(false);
        setIsLoadingGames(false);
      })();
    }
    return () => {
      mounted = false;
    };
  }, [sport]);

  React.useEffect(() => {
    let mounted = true;
    console.log(sport);

    if (mounted) {
      (async () => {
        setIsLoadingPagination(true);
        const { data: responsePagination } = await getGamesByPagination(
          page,
          sport?.name || ''
        );

        if (responsePagination.success) {
          setAllGamesPagination(responsePagination.games);
        }

        setIsLoadingPagination(false);
      })();
    }
    return () => {
      mounted = false;
    };
  }, [page, sport]);

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
        isLoadingGames,
        setIsLoadingGames,
        isLoadingGamesByType,
        setIsLoadingGamesByType,
        setIsLoadingPagination,
        isLoadingGamesPagination,
        allGamesPagination,
        setAllGamesPagination,
        page,
        setPage,
      }}
    >
      {children}
    </GameProvider>
  );
};

export { GameContext, GameContextContent };
