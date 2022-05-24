import React from 'react';
import Type from '../elements/Type';
import Banner from '../elements/Banner';
import Footer from '../elements/Footer';
import { Pane, Tablist, Tab } from 'evergreen-ui';
import { TIMES, JOGOS } from '../utils/constants';

function Admin() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState([TIMES, JOGOS]);

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
              <Type
                type={tab === TIMES ? TIMES : tab === JOGOS ? JOGOS : ''}
              ></Type>
            </Pane>
          ))}
        </Pane>
      </Pane>
      <Footer></Footer>
    </Pane>
  );
}

export default Admin;
