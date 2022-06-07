import React from 'react';
import {
  Alert,
  Button,
  Heading,
  Pane,
  TextInputField,
  Badge,
} from 'evergreen-ui';
import { errorHandler } from '../../utils/error';
import { deleteSport, getSports, postSport } from '../../api/sport';
import {
  ERROR_EMPTY_SPORT_NAME,
  ERROR_RESET,
  SUCCESS_SPORT_REGISTER,
} from '../../utils/constants';
import { TeamContext } from '../../context/TeamContext';

function TeamsForm() {
  const { setSports, sports } = React.useContext(TeamContext);

  const [sport, setSport] = React.useState('');
  const [error, setError] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validateEmptyTeamName = sport.trim() !== '';

    if (validateEmptyTeamName) {
      let { data: sportResponse } = await postSport({
        name: sport.toLowerCase(),
      });

      if (sportResponse.success) {
        const { data: response } = await getSports();

        if (response.success) {
          setSports(response.sports);
          errorHandler(SUCCESS_SPORT_REGISTER, setError);

          setTimeout(() => {
            errorHandler(ERROR_RESET, setError);
          }, 3000);
        }
      }
    } else if (!validateEmptyTeamName) {
      errorHandler(ERROR_EMPTY_SPORT_NAME, setError);
    }
  };

  const handleDelete = async (id) => {
    await deleteSport(id);

    const { data: response } = await getSports();

    if (response.success) {
      setSports(response.sports);
    }
  };

  React.useEffect(() => {
    let mounted = true;

    if (mounted) {
      (async () => {
        const { data: response } = await getSports();

        if (response.success) {
          setSports(response.sports);
        }
      })();
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Pane display='flex' justifyContent='center' flexDirection='column'>
      <Pane elevation={2} className='form-container' alignSelf='center'>
        <Heading size={700} marginBottom={24}>
          Adicionar Times
        </Heading>

        <Pane className='form'>
          <TextInputField
            label='Nome do Time'
            placeholder='O nome do time'
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          />
        </Pane>

        <Pane marginTop={8}>
          <Button marginRight={16} appearance='primary' onClick={handleSubmit}>
            Adicionar
          </Button>
        </Pane>

        <Pane marginTop={16}>
          {error.status && (
            <Alert intent={error.type} title={error.title}>
              {error.message}
            </Alert>
          )}
        </Pane>
      </Pane>

      <Pane elevation={2} className='bg-light' padding={36}>
        <Heading size={700} marginBottom={24}>
          Esportes
        </Heading>
        {sports &&
          sports.length > 0 &&
          sports.map((sport) => (
            <Badge
              key={sport._id}
              color='green'
              marginRight={8}
              onClick={() => handleDelete(sport._id)}
              cursor='pointer'
            >
              {sport.name}
            </Badge>
          ))}
      </Pane>
    </Pane>
  );
}

export default TeamsForm;
