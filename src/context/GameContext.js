import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { INITIAL_STATE_SPORT } from '../utils/constants';

const GameContext = React.createContext();
const GameProvider = GameContext.Provider;

const GameContextContent = ({ children }) => {
  const navigate = useNavigate();
  const [game, setGame] = useState({
    teamAId: '',
    teamBId: '',
    teamAScore: 0,
    teamBScore: 0,
    teamAOdd: 1.45,
    teamBOdd: 1.55,
    date: '',
    winner: '',
    type: '',
  });
  const [sport, setSport] = useState(INITIAL_STATE_SPORT);
  const [allGames, setAllGames] = useState([]);
  const [allGamesByType, setAllGamesByType] = useState([]);
  const [allGamesPerPage, setAllGamesPerPage] = useState([]);
  const [isGameUpdating, setGameIsUpdating] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(3);

  const {
    data: gameData,
    loading: gameLoading,
    error: gameError,
  } = useFetch(`/games/${sport?._id}/${page}`);

  const resetGame = () => {
    setGame({
      teamAId: '',
      teamBId: '',
      teamAScore: 0,
      teamBScore: 0,
      teamAOdd: 0.0,
      teamBOdd: 0.0,
      date: '',
      winner: '',
      type: '',
    });
  };

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (gameData?.games?.length < 3) {
        setTotalPages(page);
      } else {
        setTotalPages(page + 1);
      }
    }
    return () => {
      mounted = false;
    };
  }, [page, sport, itemsPerPage, gameData]);

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      (async () => {
        setPage(1);
        navigate(`/all/${sport.name}`);
      })();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        allGamesPerPage,
        setAllGamesPerPage,
        page,
        setPage,
        setTotalPages,
        totalPages,
        setItemsPerPage,
        itemsPerPage,
        gameData,
        gameError,
        gameLoading,
        setSelectedIndex,
        selectedIndex,
      }}
    >
      {children}
    </GameProvider>
  );
};

export { GameContext, GameContextContent };
