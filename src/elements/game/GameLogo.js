import { EMBLEM_URL } from '../../utils/constants';

export default function GameLogo({ team }) {
  return (
    <td className='game-bet--logo'>
      <img
        className='team-logo--small'
        src={EMBLEM_URL + (team?.emblem || 'default-team-logo.png')}
        alt={team?.name}
      />
    </td>
  );
}
