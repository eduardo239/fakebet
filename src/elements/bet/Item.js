import React from 'react';
import {
  Heading,
  IconButton,
  ListItem,
  Pane,
  TickCircleIcon,
  TrashIcon,
  UnorderedList,
} from 'evergreen-ui';
import { convertDateToFormat } from '../../utils/utils';

function BetItem({ bet, handleRemoveBet }) {
  if (bet)
    return (
      <Pane className='form-my-bets border-bottom--light'>
        <Pane>
          <Heading size={500}>
            {bet.gameId?.teamAId?.name} VS {bet.gameId?.teamBId?.name}
          </Heading>
          <UnorderedList>
            <ListItem icon={TickCircleIcon} iconColor='success'>
              <b>{bet.pick}</b>, Aposta R${bet?.value}, Odds: {bet.odd}, Ganhos:
              R$
              {bet.profit.toFixed(2)}
            </ListItem>
          </UnorderedList>
          <Pane className='flex-between'>
            <Heading size={100}>BET ID: {bet._id}</Heading>
            <Heading size={100}>{convertDateToFormat(bet.createdAt)}</Heading>
          </Pane>
        </Pane>
        <Pane display='flex' alignItems='center' gap={8}>
          <IconButton
            icon={TrashIcon}
            intent='minimal'
            onClick={() => handleRemoveBet(bet._id)}
          />
        </Pane>
      </Pane>
    );
  else return null;
}

export default BetItem;