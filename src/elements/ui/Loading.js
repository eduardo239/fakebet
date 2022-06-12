import { Pane, Spinner } from 'evergreen-ui';

function Loading() {
  return (
    <Pane
      display='flex'
      alignItems='center'
      justifyContent='center'
      flex={1}
      height={370}
    >
      <Spinner />
    </Pane>
  );
}

export default Loading;
