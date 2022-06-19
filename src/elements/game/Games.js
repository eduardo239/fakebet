import { Pane, Heading } from 'evergreen-ui';
import { uppercaseFirstLetter } from '../../utils/utils';
import Game from './Game';
import Loading from '../ui/Loading';
import '../../css/game.css';

function ElementGames({ type, data, loading, error }) {
  if (loading) return <Loading />;
  if (error) return <p>Something went wrong...</p>;
  return (
    <Pane>
      <Heading className='title-h1 light'>{uppercaseFirstLetter(type)}</Heading>
      <Pane className='flex-start-center flex-wrap'>
        {data.length > 0 ? (
          data.map((game, index) => <Game key={index} game={game}></Game>)
        ) : (
          <Pane>Nada encontrado aqui</Pane>
        )}
      </Pane>
    </Pane>
  );
}

export default ElementGames;
