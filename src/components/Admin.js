import React from 'react';
import Type from '../elements/Type';
import Banner from '../elements/banner/Banner';
import Footer from '../elements/Footer';
import { getTeams } from '../api/team';
import { getGames } from '../api/game';
import { GameContext } from '../context/GameContext';
import { TeamContext } from '../context/TeamContext';
import { Pane, Tablist, Tab } from 'evergreen-ui';
import { TIMES, JOGOS, ESPORTES } from '../utils/constants';
import '../css/menu.css';

function AdminView() {
  const { setTeams } = React.useContext(TeamContext);
  const { setAllGames } = React.useContext(GameContext);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState([TIMES, JOGOS, ESPORTES]);

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      (async () => {
        const { data: responseTeams } = await getTeams();
        const { data: responseGames } = await getGames();

        if (responseGames.success) {
          setAllGames(responseGames.games);
        }
        if (responseTeams.success) {
          setTeams(responseTeams.teams);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, [setAllGames, setTeams]);

  return (
    <Pane className='main-container'>
      <Banner />

      <Pane flex={1}>
        <Tablist padding={8} flexBasis={240} className='bg-dark-alternative-2'>
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              id={tab}
              onSelect={() => setSelectedIndex(index)}
              isSelected={index === selectedIndex}
              aria-controls={`panel-${tab}`}
              appearance='minimal'
              className={`tab-menu ${selectedIndex === index ? `active` : ''}`}
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
              role='tabpanel'
              aria-labelledby={tab}
              aria-hidden={index !== selectedIndex}
              display={index === selectedIndex ? 'block' : 'none'}
            >
              <Type type={tabs[selectedIndex]}></Type>
            </Pane>
          ))}
        </Pane>
      </Pane>
      <Footer></Footer>
    </Pane>
  );
}

export default AdminView;
