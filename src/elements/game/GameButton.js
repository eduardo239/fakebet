import { Button } from 'evergreen-ui';

export default function GameButton({ team, odd, showInput }) {
  console.log(team);
  return (
    <td style={{ textAlign: 'center' }}>
      <Button
        appearance='primary'
        onClick={(e) => showInput(e, team.name)}
        width='98%'
        fontFamily='monospace'
      >
        {odd.toFixed(2)}
      </Button>
    </td>
  );
}
