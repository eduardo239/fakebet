import React from 'react';
import {
  Pane,
  Heading,
  ListItem,
  TrashIcon,
  IconButton,
  UnorderedList,
  TickCircleIcon,
} from 'evergreen-ui';
import { compareDate, convertDateToFormat } from '../../utils/utils';

function BetItem({ bet, handleRemoveBet }) {
  if (bet)
    return (
      <Pane className='form-my-bets border-bottom--light'>
        <Pane>
          <Heading size={500}>
            {bet.gameId?.teamAId?.name} VS {bet.gameId?.teamBId?.name}
          </Heading>
          <UnorderedList>
            <ListItem
              icon={TickCircleIcon}
              iconColor='success'
              fontFamily='monospace'
            >
              <b>{bet.pick}</b>, Aposta R${bet?.value}, Odds:{' '}
              {bet.odd.toFixed(2)}, Ganhos: R$
              {bet.profit.toFixed(2)}, Dia:{' '}
              {convertDateToFormat(bet.gameId.date)}
            </ListItem>
            <ListItem
              icon={TickCircleIcon}
              iconColor={`${
                compareDate(bet.createdAt, bet.gameId.date)
                  ? 'success'
                  : 'danger'
              }`}
            >
              {compareDate(bet.createdAt, bet.gameId.date)
                ? 'Aposta Confirmada'
                : 'Jogo encerrado'}
            </ListItem>
          </UnorderedList>
          <Pane className='flex-between'>
            <Heading size={100}>BET ID: {bet._id}</Heading>
            <Heading size={100}>{convertDateToFormat(bet.createdAt)}</Heading>
          </Pane>
        </Pane>
        <Pane display='flex' alignItems='center' gap={8}>
          <IconButton
            disabled={!compareDate(bet.createdAt, bet.gameId.date)}
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
