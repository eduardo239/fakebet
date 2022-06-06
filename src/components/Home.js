import { Pane, Tablist, Tab, Pagination } from 'evergreen-ui';
import React from 'react';
import Banner from '../elements/Banner';
import Games from '../elements/Games';
import Footer from '../elements/Footer';
// import { FUTEBOL, BASQUETE, ESPORTS } from '../utils/constants';
import { GameContext } from '../context/GameContext';
import { TeamContext } from '../context/TeamContext';
import '../css/game.css';
import '../css/menu.css';
import { uppercaseFirstLetter } from '../utils/utils';

function ComponentHome() {
  const { setSport } = React.useContext(GameContext);
  const { sports } = React.useContext(TeamContext);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  // const [tabs] = React.useState([FUTEBOL, BASQUETE, ESPORTS]);

  return (
    <Pane display='flex' flexDirection='column' height='100vh'>
      <Banner></Banner>
      <Pane className='games-container' flex={1}>
        <Tablist padding={8} flexBasis={240} className='tab-game-menu'>
          {sports.map((tab, index) => (
            <Tab
              key={tab._id}
              id={tab.name}
              onSelect={() => {
                setSelectedIndex(index);
                setSport(sports[index]);
              }}
              isSelected={index === selectedIndex}
              aria-controls={`panel-${tab.name}`}
              appearance='minimal'
              className={`tab-menu ${selectedIndex === index ? `active` : ''}`}
            >
              {uppercaseFirstLetter(tab.name)}
            </Tab>
          ))}
        </Tablist>

        <Pane paddingBottom={32} paddingTop={32}>
          {sports.map((tab, index) => (
            <Pane
              key={tab._id}
              id={`panel-${tab.name}`}
              role='tabpanel'
              aria-labelledby={tab.name}
              aria-hidden={index !== selectedIndex}
              display={index === selectedIndex ? 'block' : 'none'}
            >
              <Games type={sports[selectedIndex]}></Games>
            </Pane>
          ))}
        </Pane>
      </Pane>

      <Pane
        marginTop={16}
        marginBottom={16}
        display='flex'
        justifyContent='center'
      >
        <Pagination page={1} totalPages={5}></Pagination>
      </Pane>

      <Footer></Footer>
    </Pane>
  );
}

export default ComponentHome;
