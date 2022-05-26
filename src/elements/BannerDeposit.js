import React from 'react';
import { Pane } from 'evergreen-ui';
import banner from '../assets/banner/banner_deposit.jpg';
import '../css/banner.css';

function BannerDeposit() {
  return (
    <Pane className="banner-container">
      <Pane>
        <img src={banner} alt="Fakebet - BET" className="banner" />
      </Pane>
    </Pane>
  );
}

export default BannerDeposit;
