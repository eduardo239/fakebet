import { Small } from 'evergreen-ui';

export default function GameName({ team }) {
  return (
    <td className='game-bet--name'>
      <Small>{team?.name}</Small>
    </td>
  );
}
