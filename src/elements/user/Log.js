import React from 'react';
import { Pane, Tablist, Tab, Paragraph, Button } from 'evergreen-ui';
import { getBalanceByUserId } from '../../api/historyBalance';
import { UserContext } from '../../context/UserContext';

function MyLog() {
  const { user } = React.useContext(UserContext);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState(['Apostas', 'Movimentação Financeira']);

  const handleFetch = async () => {
    if (user) {
      const response = await getBalanceByUserId(user._id);
      console.log(response);
    }
  };
  // TODO: show balance

  return (
    <Pane height={120}>
      <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
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
      <Pane padding={16} background='tint1' flex='1'>
        {tabs.map((tab, index) => (
          <Pane
            key={tab}
            id={`panel-${tab}`}
            role='tabpanel'
            aria-labelledby={tab}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'block' : 'none'}
          >
            <Paragraph>Panel {tab}</Paragraph>
            <Button onClick={handleFetch}>FETCH</Button>
          </Pane>
        ))}
      </Pane>
    </Pane>
  );
}

export default MyLog;
