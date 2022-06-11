import { Pane } from 'evergreen-ui';
import React from 'react';
import '../../css/banner.css';
import banner from '../../assets/banner/poster.jpg';

function Banner() {
  return (
    <Pane className='banner-container'>
      <img src={banner} alt='Fakebet - BET' className='banner' />
    </Pane>
  );
}

export default Banner;
