import { Pane, Small } from 'evergreen-ui';
import { convertDateToFormat, isToday } from '../../utils/utils';

export default function GameToday({ game }) {
  return (
    <Pane
      className={`small light-alternate-2 ${isToday(game.date) ? 'today' : ''}`}
    >
      <Small>DIA - {convertDateToFormat(game.date)}</Small>
    </Pane>
  );
}
