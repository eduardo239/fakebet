import { Pane, Heading } from 'evergreen-ui';
import Game from './Game';
import Loading from '../ui/Loading';
// import { GameContext } from '../../context/GameContext';
import { uppercaseFirstLetter } from '../../utils/utils';
import '../../css/game.css';

function ElementGames({ type, data, loading, error }) {
  // const { allGamesPerPage } = React.useContext(GameContext);
  if (loading) return <Loading />;
  if (error) return <p>Something went wrong...</p>;
  return (
    <Pane>
      <Heading className='title-h1 light'>{uppercaseFirstLetter(type)}</Heading>
      <Pane className='flex-start-center flex-wrap'>
        {data.length > 0 ? (
          data.map((game, index) => <Game key={index} game={game}></Game>)
        ) : (
          <Pane>Jogos não encontrados</Pane>
        )}
      </Pane>
    </Pane>
  );
}

export default ElementGames;
