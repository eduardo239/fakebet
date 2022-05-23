import React from 'react';
import { Pane } from 'evergreen-ui';
import { useParams } from 'react-router-dom';

function Game() {
  let { type } = useParams();

  return (
    <Pane display="flex" justifyContent="center">
      game {type}
    </Pane>
  );
}

export default Game;
