import { EMBLEM_URL } from '../../utils/constants';

export default function GameLogo({ team }) {
  return (
    <td
      style={{
        verticalAlign: 'middle',
        background: '#bdbdbd',
        height: '73px',
        width: '93px',
      }}
    >
      <img
        className='team-logo--small'
        src={EMBLEM_URL + (team.emblem || 'default-team-logo.png')}
        alt={team.name}
      />
    </td>
  );
}
