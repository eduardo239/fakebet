import React from 'react';
import { Heading, IconButton, Pane, TrashIcon } from 'evergreen-ui';

function MyBetItem({ bet }) {
  if (bet)
    return (
      <>
        <Pane display='flex' alignItems='center' gap={8}>
          <Pane className='form-grid' flex={1}>
            <Heading size={500}>
              {bet?.gameId?.teamAId?.name
                ? bet?.gameId?.teamAId?.name
                : 'Não definido'}{' '}
              VS{' '}
              {bet?.gameId?.teamBId?.name
                ? bet?.gameId?.teamBId?.name
                : 'Não definido'}
            </Heading>
            <Heading size={200} textAlign='right'>
              Valor: R${bet?.value ? bet.value : 0}
            </Heading>

            <Heading size={200}>My BET:</Heading>
            <Heading size={200} textAlign='right'>
              {bet?.pick ? bet.pick : 'Não definido'}
            </Heading>
          </Pane>

          <IconButton icon={TrashIcon} intent='danger' />
        </Pane>
        <hr />
      </>
    );
  else return null;
}

export default MyBetItem;
