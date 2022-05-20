import { Button, Pane, TextInputField, Heading } from 'evergreen-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/menu.css';

function Menu() {
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
          <Link to="/">
            <Button appearance="minimal">FAKEBET</Button>
          </Link>
          <Link to="/games">
            <Button appearance="minimal">JOGOS</Button>
          </Link>
          <Link to="/deposit">
            <Button appearance="minimal">DEPÓSITO</Button>
          </Link>
        </Pane>
        <Pane>
          <Link to="/signup">
            <Button appearance="minimal">MINHAS APOSTAS</Button>
          </Link>
          <Link to="/signin">
            <Button appearance="minimal">LOGIN/REGISTER</Button>
          </Link>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Menu;
