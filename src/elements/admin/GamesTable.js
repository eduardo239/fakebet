import React from 'react';
import { GameContext } from '../../context/GameContext';
import { convertDate, isToday } from '../../utils/utils';
import { getGames, removeGame } from '../../api/game';
import { Pane, Dialog, Button, Paragraph } from 'evergreen-ui';

function GamesTable() {
  const { game, setGame, setGames, setAllGames, allGames, setGameIsUpdating } =
    React.useContext(GameContext);

  const [isShownDeleteModal, setIsShownDeleteModal] = React.useState(false);

  const handleSelect = (game) => {
    console.log(game);
    setGame(game);
    setGameIsUpdating(true);
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
