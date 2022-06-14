import { Pane, Spinner } from 'evergreen-ui';

function Loading() {
  return (
    <Pane
      display='flex'
      alignItems='center'
      justifyContent='center'
      height={220}
    >
      <Spinner />
    </Pane>
  );
}

export default Loading;
