import { Button, Pane, TextInputField, Heading } from 'evergreen-ui';
import React from 'react';
import '../css/menu.css';

function GamesMenu() {
  const [value, setValue] = React.useState('');
  return (
    <Pane
      display="block"
      alignItems="center"
      justifyContent="center"
      paddingTop={0}
      maxWidth={1000}
      width="100%"
    >
      <Pane
        display="flex"
        justifyContent="space-between"
        className="menu"
        padding={4}
      >
        <Pane display="flex" gap={4}>
          <Button appearance="minimal">FUTEBOL</Button>
          <Button appearance="minimal">BASQUETE</Button>
          <Button appearance="minimal">E-SPORT</Button>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default GamesMenu;
