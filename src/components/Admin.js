import React from 'react';
import Banner from '../elements/banner/Banner';
import Footer from '../elements/ui/Footer';
import TeamsForm from '../elements/admin/TeamsForm';
import GamesForm from '../elements/admin/GamesForm';
import SportsForm from '../elements/admin/SportsForm';
import TeamsTable from '../elements/admin/TeamsTable';
import GamesTable from '../elements/admin/GamesTable';
import { Pane, Tablist, Tab } from 'evergreen-ui';
import { TIMES, JOGOS, ESPORTES } from '../utils/constants';

function AdminView() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState([TIMES, JOGOS, ESPORTES]);

  return (
    <Pane className='main-container'>
      <Banner />

      <Pane>
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
              {TIMES === tabs[selectedIndex] ? (
                <>
                  <TeamsForm />
                  <TeamsTable />
                </>
              ) : JOGOS === tabs[selectedIndex] ? (
                <>
                  <GamesForm />
                  <GamesTable />
                </>
              ) : (
                ESPORTES === tabs[selectedIndex] && (
                  <>
                    <SportsForm />
                  </>
                )
              )}
            </Pane>
          ))}
        </Pane>
      </Pane>
      <Footer />
    </Pane>
  );
}

export default AdminView;
