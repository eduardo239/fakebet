import React from 'react';
import {
  Pane,
  TextInput,
  IconButton,
  SmallTickIcon,
  SmallCrossIcon,
} from 'evergreen-ui';

function BetValue({ betRef, showValue, addBet, closeBet }) {
  return (
    <Pane position='relative'>
      <Pane display={showValue ? 'flex' : 'none'} className='game-bet--value'>
        <TextInput
          name='text-input-name'
          placeholder='Valor...'
          type='number'
          ref={betRef}
        />
        <Pane className='icon'>
          <IconButton icon={SmallTickIcon} onClick={addBet} intent='success' />
        </Pane>
        <Pane className='icon'>
          <IconButton icon={SmallCrossIcon} onClick={closeBet} />
        </Pane>
      </Pane>
    </Pane>
  );
}

export default BetValue;
