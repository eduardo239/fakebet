import React from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Heading, Pane } from 'evergreen-ui';
import Game from '../elements/Game';
import Banner from '../elements/Banner';
import esports from '../api/esports.json';
import '../css/game.css';

function GameView() {
  let { type, id } = useParams();

  const [data, setData] = React.useState([]);
  const [dataNotFound, setDataNotFound] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    let result = esports.filter((obj) => obj.id === id);

    if (mounted) {
      if (result.length > 0) {
        setData(result[0]);
      } else {
        setDataNotFound(true);
      }
    }
    return () => (mounted = false);
  }, [type, id]);

  return (
    <Pane display="flex" justifyContent="center" flexDirection="column">
      <Banner></Banner>
      {!dataNotFound ? (
        <>
          <Pane className="game">
            <Pane className="game-score">
              <Heading size={600}>{data.team1}</Heading>
              <Heading size={600}>VS</Heading>
              <Heading size={600}>{data.team2}</Heading>
            </Pane>
          </Pane>

          <Pane display="flex" alignItems="center" justifyContent="center">
            <Game game={data}></Game>
          </Pane>
        </>
      ) : (
        <Pane>
          <Alert intent="none" title="No Data" marginBottom={32}>
            No Data Found
          </Alert>
        </Pane>
      )}
    </Pane>
  );
}

export default GameView;
