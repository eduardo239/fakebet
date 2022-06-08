import React from 'react';
import Banner from '../elements/Banner';
import Games from '../elements/Games';
import Footer from '../elements/Footer';
import { GameContext } from '../context/GameContext';
import { TeamContext } from '../context/TeamContext';
import { useNavigate } from 'react-router-dom';
import { uppercaseFirstLetter } from '../utils/utils';
import { Pane, Tablist, Tab, Pagination } from 'evergreen-ui';
import '../css/game.css';
import '../css/menu.css';

function ComponentHome() {
  const navigate = useNavigate();

  const { sports } = React.useContext(TeamContext);
  const { sport, setSport, page, setPage, totalPages } =
    React.useContext(GameContext);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleChangePage = (page) => {
    setPage(page);
    navigate(`/all/${sport.name}/${page}`);
  };

  return (
    <Pane className='main-content'>
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
              <Games type={tab.name}></Games>
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
          page={page}
          totalPages={totalPages}
          onPreviousPage={() => handleChangePage(page - 1)}
          onPageChange={(x) => handleChangePage(x)}
          onNextPage={() => handleChangePage(page + 1)}
        ></Pagination>
      </Pane>

      <Footer></Footer>
    </Pane>
  );
}

export default ComponentHome;
