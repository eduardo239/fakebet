import { Button } from 'evergreen-ui';

export default function GameButton({ team, odd, showInput }) {
  return (
    <td style={{ textAlign: 'center' }}>
      <Button
        className='btn-primary'
        onClick={(e) => showInput(e, team.name)}
        width='98%'
      >
        {odd.toFixed(2)}
      </Button>
    </td>
  );
}
