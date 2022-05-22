import React from 'react';
import { Pane } from 'evergreen-ui';
import { useParams } from 'react-router-dom';

function Game() {
  let { type } = useParams();

  console.log(type);
  return (
    <Pane display="flex" justifyContent="center">
      game
    </Pane>
  );
}

export default Game;
