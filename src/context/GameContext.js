import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getGamesByPagination } from '../api/game';
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
    teamAOdd: 1,
    teamBOdd: 1,
    createdAt: '',
    winner: '',
    type: '',
  });
  const [sport, setSport] = useState(INITIAL_STATE_SPORT);
  const [allGames, setAllGames] = useState([]);
  const [allGamesByType, setAllGamesByType] = useState([]);
  const [allGamesPerPage, setAllGamesPerPage] = useState([]);
  const [isGameUpdating, setGameIsUpdating] = React.useState(false);

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(3);

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
        setPage(1);
        navigate(`/all/${sport.name}`);
      })();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sport]);

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      (async () => {
        const { data: responsePagination } = await getGamesByPagination(
          page,
          sport?._id || ''
        );

        if (responsePagination.success) {
          let length = responsePagination.games.length;
          if (length === itemsPerPage) {
            setTotalPages(page + 1);
          }
          setAllGamesPerPage(responsePagination.games);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [page, sport, itemsPerPage]);

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
      }}
    >
      {children}
    </GameProvider>
  );
};

export { GameContext, GameContextContent };
