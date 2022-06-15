export default function GameButton({ team, odd, showInput }) {
  return (
    <td style={{ paddingRight: '1px', paddingLeft: '1px' }}>
      <button
        className='btn btn-full btn-primary'
        onClick={(e) => showInput(e, team.name)}
      >
        {odd.toFixed(2)}
      </button>
    </td>
  );
}
