import React from 'react';
import Type from '../elements/Type';
import Banner from '../elements/Banner';
import Footer from '../elements/Footer';
import { getTeams } from '../api/team';
import { TeamContext } from '../context/TeamContext';
import { Pane, Tablist, Tab } from 'evergreen-ui';
import { TIMES, JOGOS, ESPORTES } from '../utils/constants';
import '../css/menu.css';
import { GameContext } from '../context/GameContext';
import { getGames } from '../api/game';

function AdminView() {
  const { setTeams } = React.useContext(TeamContext);
  const { setIsLoadingGames, setAllGames } = React.useContext(GameContext);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState([TIMES, JOGOS, ESPORTES]);

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      (async () => {
        const { data: responseTeams } = await getTeams();

        setIsLoadingGames(true);
        const { data: responseGames } = await getGames();
        if (responseGames.success) {
          setAllGames(responseGames.games);
        }
        setIsLoadingGames(false);

        if (responseTeams.success) {
          setTeams(responseTeams.teams);
        }
      })();
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Pane display='flex' flexDirection='column' height='100vh'>
      <Banner></Banner>

      <Pane className='games-container' flex={1}>
        <Tablist padding={8} flexBasis={240} className='tab-game-menu'>
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
