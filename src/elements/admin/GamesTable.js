import React from 'react';
import { GameContext } from '../../context/GameContext';
import { convertDate, isToday } from '../../utils/utils';
import { getGames, removeGame, updateGame } from '../../api/game';
import {
  Pane,
  Dialog,
  Button,
  Paragraph,
  TextInputField,
  Overlay,
  Heading,
} from 'evergreen-ui';

function GamesTable() {
  const { game, setGame, setGames, setAllGames, allGames, setGameIsUpdating } =
    React.useContext(GameContext);

  const [isShownDeleteModal, setIsShownDeleteModal] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);
  const [score, setScore] = React.useState({
    home: '',
    away: '',
  });

  const handleSelect = (game) => {
    setGame(game);
    setGameIsUpdating(true);
    setScore({
      home: game.teamAScore,
      away: game.teamBScore,
    });
    setIsShown(true);
  };

  const handleUpdate = async () => {
    const { data: response } = await updateGame({
      ...game,
      teamAScore: score.home,
      teamBScore: score.away,
    });
    if (response.success) {
      const { data: responseGames } = await getGames();
      if (responseGames.success) {
        setAllGames(responseGames.games);
        setGameIsUpdating(false);
        setIsShown(false);
      }
    }
  };

  const handleDelete = async () => {
    let { data: response } = await removeGame(game._id);
    if (response.success) {
      // success
      setIsShownDeleteModal(false);
      setAllGames(allGames.filter((g) => g._id !== game._id));
    } else {
      // errorHandler(response.error);
    }
    setGames(allGames.filter((item) => item._id !== game._id));
  };

  React.useEffect(() => {
    let mounted = true;
    // FIXME: 3 times, fetch all games
    if (mounted) {
      (async () => {
        const { data: responseGames } = await getGames();
        if (responseGames.success) {
          setAllGames(responseGames.games);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [setAllGames]);

  return (
    <Pane className='flex-column-center-100'>
      <React.Fragment>
        <Overlay isShown={isShown} onExit={() => setIsShown(false)}>
          <Pane className='modal-container'>
            <Pane className='modal'>
              <Heading size={600} marginBottom={24}>
                Editar Placar
              </Heading>
              <Pane className='flex-start-start' gap={8}>
                <TextInputField
                  type='number'
                  label={`Home ${game.teamAId?.name || '---'}`}
                  value={score.home}
                  onChange={(e) => setScore({ ...score, home: e.target.value })}
                />

                <TextInputField
                  type='number'
                  label={`Home ${game.teamBId?.name || '---'}`}
                  value={score.away}
                  onChange={(e) => setScore({ ...score, away: e.target.value })}
                />
              </Pane>
              <button className='btn btn-primary' onClick={handleUpdate}>
                Atualizar
              </button>
            </Pane>
          </Pane>
        </Overlay>
      </React.Fragment>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Home Team</th>
            <th>HT Score</th>
            <th>HT ODD</th>
            <th>Draw Odd</th>
            <th>Away Team</th>
            <th>AT Score</th>
            <th>AT ODD</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* onClick={() => handleSelect(game)} */}
        <tbody>
          {allGames.length > 0 &&
            allGames.map((game) => (
              <tr key={game._id} onClick={() => handleSelect(game)}>
                <td
                  style={{ width: '120px' }}
                  className={`${isToday(game.date) ? 'today' : 'not-today'}`}
                >
                  <p>{convertDate(game.date)}</p>
                </td>
                <td style={{ paddingLeft: '8px' }}>
                  {game.teamAId?.name ? game.teamAId.name : '---'}
                </td>
                <td style={{ paddingLeft: '8px' }}>{game.teamAScore}</td>
                <td style={{ paddingLeft: '8px' }}>{game.teamAOdd}</td>
                <td style={{ paddingLeft: '8px' }}>
                  {((game.teamBOdd / game.teamAOdd) * 10).toFixed(2)}
                </td>
                <td style={{ paddingLeft: '8px' }}>
                  {game.teamBId?.name ? game.teamBId.name : '---'}
                </td>
                <td style={{ paddingLeft: '8px' }}>{game.teamBScore}</td>
                <td style={{ paddingLeft: '8px' }}>{game.teamBOdd}</td>
                <td
                  style={{
                    width: '75px',
                    textAlign: 'center',
                  }}
                >
                  <Button
                    appearance='primary'
                    intent='danger'
                    onClick={() => setIsShownDeleteModal(true)}
                  >
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Dialog
        isShown={isShownDeleteModal}
        title='Remover Time'
        intent='danger'
        cancelLabel='Cancelar'
        onCloseComplete={() => setIsShownDeleteModal(false)}
        confirmLabel='Remover'
        onConfirm={() => handleDelete()}
      >
        <Paragraph size={300} marginTop={12}>
          Você tem certeza que deseja remover o jogo de id:
          {game ? game._id : '.'}?
        </Paragraph>
      </Dialog>
    </Pane>
  );
}

export default GamesTable;
