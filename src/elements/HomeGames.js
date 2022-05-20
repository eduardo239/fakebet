import { Button, Pane, TextInputField, Heading } from 'evergreen-ui';
import React from 'react';
import '../css/menu.css';
import HomeGamesItem from './HomeGamesItem';

function GamesHome() {
  const [value, setValue] = React.useState('');
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      flexWrap="wrap"
    >
      <HomeGamesItem></HomeGamesItem>
      <HomeGamesItem></HomeGamesItem>
      <HomeGamesItem></HomeGamesItem>
      <HomeGamesItem></HomeGamesItem>
      <HomeGamesItem></HomeGamesItem>
      <HomeGamesItem></HomeGamesItem>
      <HomeGamesItem></HomeGamesItem>
    </Pane>
  );
}

export default GamesHome;
