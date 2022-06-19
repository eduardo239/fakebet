import React from 'react';
import {
  Pane,
  Heading,
  TrashIcon,
  IconButton,
  StatusIndicator,
} from 'evergreen-ui';
import { compareDate, convertDateToFormat } from '../../utils/utils';

function BetItem({ bet, handleRemoveBet }) {
  console.log(bet);
  if (bet && bet.gameId)
    return (
      <Pane className='form-my-bets border-bottom--light'>
        <Pane>
          <Heading size={500} marginBottom={10}>
            {bet.gameId?.teamAId?.name} VS {bet.gameId?.teamBId?.name}
          </Heading>
          <p>
            <small className='dark monospace'>
              <b>Valor: </b>
              R${bet.value}
            </small>
          </p>
          <p>
            <small className='dark monospace'>
              <b>Escolha: </b>
              {bet.pick}
            </small>
          </p>
          <p>
            <small className='dark monospace'>
              <b>Odd:</b> {bet.odd.toFixed(2)}
            </small>
          </p>
          <p>
            <small className='dark monospace'>
              <b>Ganho Possível:</b> R${bet.profit.toFixed(2)}
            </small>
          </p>
          <p>
            <small className='dark monospace'>
              <b>Dia do Jogo:</b> {convertDateToFormat(bet.gameId.date)}
            </small>
          </p>
          <p style={{ marginTop: '10px', marginBottom: '10px' }}>
            <StatusIndicator
              color={`${
                compareDate(bet.createdAt, bet.gameId.date)
                  ? 'danger'
                  : 'success'
              }`}
            >
              Aposta confirmada
            </StatusIndicator>
          </p>

          <Pane className='flex-between'>
            <Heading size={100}>BET ID: {bet._id}</Heading>
            <Heading size={100}>{convertDateToFormat(bet.createdAt)}</Heading>
          </Pane>
        </Pane>
        <Pane display='flex' alignItems='center' gap={8}>
          <IconButton
            disabled={compareDate(bet.createdAt, bet.gameId.date)}
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
