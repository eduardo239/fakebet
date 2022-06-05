import React from 'react';
import { Pane, Table, Dialog, Button, Paragraph } from 'evergreen-ui';
import { GameContext } from '../../context/GameContext';
import { convertDate, convertDateToMongoose } from '../../utils/utils';
import { removeGame } from '../../api/game';

function GamesTable() {
  const {
    game,
    games,
    setGame,
    setGames,
    setAllGames,
    allGames,
    setGameIsUpdating,
  } = React.useContext(GameContext);

  const [isShownDeleteModal, setIsShownDeleteModal] = React.useState(false);

  const handleSelect = (game) => {
    setGame({
      ...game,
      createdAt: convertDateToMongoose(game.createdAt),
    });

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
    setGames(games.filter((item) => item._id !== game._id));
  };

  return (
    <Pane
      display='flex'
      flexDirection='column'
      justifyContent='center'
      width='100%'
    >
      <Table className='table'>
        <Table.Head>
          <Table.TextHeaderCell>Time 1</Table.TextHeaderCell>
          <Table.TextHeaderCell>Time 2</Table.TextHeaderCell>
          <Table.TextHeaderCell>Resultado Time 1</Table.TextHeaderCell>
          <Table.TextHeaderCell>Resultado Time 2</Table.TextHeaderCell>
          <Table.TextHeaderCell>Última Atualização</Table.TextHeaderCell>
          <Table.TextHeaderCell>Vencedor</Table.TextHeaderCell>
          <Table.TextHeaderCell>Remover</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {allGames &&
            allGames.length > 0 &&
            allGames.map((item) => (
              <Table.Row
                className={`${
                  game && item._id === game._id ? 'selected' : ''
                } table-row`}
                key={item._id}
                height={40}
                isSelectable
                onSelect={() => handleSelect(item)}
              >
                <Table.TextCell>{item.teamAId.name}</Table.TextCell>
                <Table.TextCell>{item.teamBId.name}</Table.TextCell>
                <Table.TextCell>{item.teamAScore}</Table.TextCell>
                <Table.TextCell>{item.teamBScore}</Table.TextCell>
                <Table.TextCell>{convertDate(item.updatedAt)}</Table.TextCell>
                <Table.TextCell>{item.winner || 'none'}</Table.TextCell>

                <Table.TextCell>
                  <Button
                    appearance='primary'
                    intent='danger'
                    onClick={() => setIsShownDeleteModal(true)}
                  >
                    Remover
                  </Button>
                </Table.TextCell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>

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
