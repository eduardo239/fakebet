import { Pane, Tablist, Tab } from 'evergreen-ui';
import React from 'react';
import Banner from '../elements/Banner';
import Games from '../elements/Games';
import '../css/game.css';
import Footer from '../elements/Footer';

const FUTEBOL = 'Futebol';
const BASQUETE = 'Basquete';
const ESPORTS = 'E-sports';

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
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
        <Pane paddingBottom={32}>
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
