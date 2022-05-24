import { Pane, Tablist, Tab } from 'evergreen-ui';
import React from 'react';
import Banner from '../elements/Banner';
import Games from '../elements/Games';
import Footer from '../elements/Footer';
import '../css/game.css';
import { FUTEBOL, BASQUETE, ESPORTS } from '../utils/constants';

function Home() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState([FUTEBOL, BASQUETE, ESPORTS]);

  return (
    <Pane display="flex" flexDirection="column" height="100vh">
      <Banner></Banner>
      <Pane className="games-container" flex={1}>
        <Tablist padding={8} flexBasis={240} className="tab-game-menu">
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              id={tab}
              onSelect={() => setSelectedIndex(index)}
              isSelected={index === selectedIndex}
              aria-controls={`panel-${tab}`}
              appearance="minimal"
              className={`tab-menu-games ${
                selectedIndex === index
                  ? `futebol-active`
                  : selectedIndex === index
                  ? `basquete-active`
                  : selectedIndex === index
                  ? `esports-active`
                  : ''
              }`}
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
        <Pane paddingBottom={32} paddingTop={32}>
          {tabs.map((tab, index) => (
            <Pane
              key={tab}
              id={`panel-${tab}`}
              role="tabpanel"
              aria-labelledby={tab}
              aria-hidden={index !== selectedIndex}
              display={index === selectedIndex ? 'block' : 'none'}
            >
              <Games
                type={
                  tab === FUTEBOL
                    ? FUTEBOL
                    : tab === BASQUETE
                    ? BASQUETE
                    : tab === ESPORTS
                    ? ESPORTS
                    : ''
                }
              ></Games>
            </Pane>
          ))}
        </Pane>
      </Pane>
      <Footer></Footer>
    </Pane>
  );
}

export default Home;
