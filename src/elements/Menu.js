import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Pane } from 'evergreen-ui';
import '../css/menu.css';

function Menu() {
  return (
    <Pane>
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
        <Pane display="flex" gap={4}>
          <Link to="/signup">
            <Button appearance="minimal">REGISTRAR</Button>
          </Link>
          <Link to="/signin">
            <Button appearance="minimal">ENTRAR</Button>
          </Link>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Menu;
