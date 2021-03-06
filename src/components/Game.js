import React from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Pane } from 'evergreen-ui';
import Banner from '../elements/banner/Banner';
import esports from '../api/esports.json';
import '../css/game.css';

function GameView() {
  let { type, id } = useParams();

  const [data, setData] = React.useState([]);
  const getGameById = (id) => {
    let game = esports.filter((game) => game.id === id);
    setData(game);
  };

  React.useEffect(() => {
    getGameById(id);
  }, [id]);

  return (
    <Pane display='flex' justifyContent='center' flexDirection='column'>
      <Banner></Banner>
      <Pane className='game-container'>
        <Pane textAlign='center' paddingTop={8}>
          <Heading size={400}>{type && type.toUpperCase()}</Heading>
        </Pane>

        <Pane>
          {data.length > 0 && (
            <Pane>
              <Heading size={900}>{data[0].team1}</Heading>
              <Heading size={900}>VS</Heading>
              <Heading size={900}>{data[0].team2}</Heading>
            </Pane>
          )}
        </Pane>

        <Pane>
          <Heading size={400}>--</Heading>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default GameView;
