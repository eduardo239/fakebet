import React from 'react';
import Footer from '../elements/ui/Footer';
import Games from '../elements/game/Games';
import Banner from '../elements/banner/Banner';
import { GameContext } from '../context/GameContext';
import { TeamContext } from '../context/TeamContext';
import { uppercaseFirstLetter } from '../utils/utils';
import { Pane, Tablist, Tab, Pagination } from 'evergreen-ui';

function ComponentHome() {
  const { sportsData } = React.useContext(TeamContext);
  const {
    page,
    totalPages,
    setPage,
    setSport,
    gameData,
    gameError,
    gameLoading,
  } = React.useContext(GameContext);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Pane className='main-container'>
      <Banner />
      <Pane flex={1}>
        <Tablist padding={8} flexBasis={240} className='bg-dark-alternative-2'>
          {sportsData?.sports?.map((tab, index) => (
            <Tab
              key={tab._id}
              id={tab.name}
              onSelect={() => {
                setSelectedIndex(index);
                setSport(sportsData?.sports?.[index]);
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
          {sportsData?.sports?.map((tab, index) => (
            <Pane
              key={tab._id}
              id={`panel-${tab.name}`}
              role='tabpanel'
              aria-labelledby={tab.name}
              aria-hidden={index !== selectedIndex}
              display={index === selectedIndex ? 'block' : 'none'}
            >
              <Games
                type={tab.name}
                data={gameData?.games ? gameData.games : []}
                loading={gameLoading}
                error={gameError}
              ></Games>
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
        <Pagination
          page={page || 1}
          totalPages={totalPages}
          onPreviousPage={() => setPage(page - 1)}
          onPageChange={(x) => setPage(x)}
          onNextPage={() => setPage(page + 1)}
        ></Pagination>
      </Pane>

      <Footer />
    </Pane>
  );
}

export default ComponentHome;
