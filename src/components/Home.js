import { Pane } from 'evergreen-ui';
import React from 'react';
import Banner from '../elements/Banner';
import GamesMenu from '../elements/GamesMenu';
import GamesHome from '../elements/HomeGames';

function Home() {
  const [value, setValue] = React.useState('');
  return (
    <Pane>
      <Banner></Banner>
      <GamesMenu></GamesMenu>
      <GamesHome></GamesHome>
    </Pane>
  );
}

export default Home;
