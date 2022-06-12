import React from 'react';
import { Pane, Tab, Tablist } from 'evergreen-ui';
import { DEPOSITO, RETIRADA } from '../utils/constants';
import DepositForm from '../elements/deposit/Deposit';
import BannerDeposit from '../elements/banner/BannerDeposit';
import WithdrawalForm from '../elements/withdrawal/Withdrawal';

function TransferView() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState([DEPOSITO, RETIRADA]);

  return (
    <Pane className='main-container'>
      <BannerDeposit />

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
              {tab === DEPOSITO ? <DepositForm /> : <WithdrawalForm />}
            </Pane>
          ))}
        </Pane>
      </Pane>
    </Pane>
  );
}

export default TransferView;
