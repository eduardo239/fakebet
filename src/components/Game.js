import React from 'react';
import { Heading, Pane } from 'evergreen-ui';
import { useParams } from 'react-router-dom';
import esports from '../api/esports.json';
import Banner from '../elements/Banner';
import '../css/game.css';

function Game() {
  let { type, id } = useParams();
  const [data, setData] = React.useState([]);

  // React.useEffect(() => {
  //   let mounted = true;
  //   getList().then((items) => {
  //     if (mounted) {
  //       setList(items);
  //     }
  //   });
  //   return () => (mounted = false);
  // }, []);

  React.useEffect(() => {
    let mounted = true;
    let result = esports.filter((obj) => obj.id === id);
    if (mounted) {
      setData(result[0]);
    }
    return () => (mounted = false);
  }, [type, id]);

  return (
    <Pane display="flex" justifyContent="center" flexDirection="column">
      <Banner></Banner>
      <Pane className="game">
        <Pane className="game-score">
          <Heading size={600}>{data.team1}</Heading>
          <Heading size={600}>VS</Heading>
          <Heading size={600}>{data.team2}</Heading>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Game;
