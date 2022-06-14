import { Pane, Paragraph } from 'evergreen-ui';
import { convertDateToFormat, isToday } from '../../utils/utils';

export default function GameToday({ game }) {
  return (
    <Pane className={`${isToday(game.date) ? 'today' : 'not-today'}`}>
      <Paragraph>DIA - {convertDateToFormat(game.date)}</Paragraph>
    </Pane>
  );
}
