import React from 'react';
import {
  Alert,
  Button,
  Heading,
  Pane,
  Select,
  Small,
  TextInputField,
} from 'evergreen-ui';
import FileUploaderSingleUpload from './FilleUploader';
import { getTeams, postTeam, uploadImage } from '../../api/team';
import { WARNING } from '../../utils/constants';
import { TeamContext } from '../../context/TeamContext';

function Teams() {
  const { team, setTeams } = React.useContext(TeamContext);
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [files, setFiles] = React.useState([]);
  const [shortName, setShortName] = React.useState('');

  const [error, setError] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const submitTeam = async (e) => {
    e.preventDefault();
    setError({
      title: '',
      message: '',
      status: false,
      type: '',
    });

    if (name === '') {
      setError({
        title: 'Error',
        message: 'O time precisa ter um nome',
        status: true,
        type: WARNING,
      });
    } else if (shortName === '') {
      setError({
        title: 'Error',
        message: 'O time precisa ter um nome curto',
        status: true,
        type: WARNING,
      });
    } else if (type === '') {
      setError({
        title: 'Error',
        message: 'O time precisa ter um tipo de esporte',
        status: true,
        type: WARNING,
      });
    } else {
      const newTeamData = {
        name,
        shortName,
        type,
      };

      let { data: teamResponse } = await postTeam(newTeamData);

      if (teamResponse.success) {
        const newTeamFile = new FormData();
        newTeamFile.append('emblem', files[0]);

        let { team } = teamResponse;
        let { data: emblemResponse } = await uploadImage(newTeamFile, team._id);

        if (emblemResponse.success) {
          resetFields();
          setError({
            title: 'Sucesso',
            message: 'Time cadastrado com sucesso',
            status: true,
            type: 'success',
          });

          let { data: teamsResponse } = await getTeams();

          setTeams(teamsResponse.teams);

          setTimeout(() => {
            setError({
              title: '',
              message: '',
              status: false,
              type: '',
            });
          }, 3000);
        } else {
          setError({
            title: 'Error',
            message: 'Erro ao cadastrar time',
            status: true,
            type: WARNING,
          });
        }
      } else {
        setError({
          title: 'Error',
          message: 'Erro ao cadastrar time',
          status: true,
          type: WARNING,
        });
      }
    }
  };

  const resetFields = () => {
    setName('');
    setShortName('');
    setFiles([]);
  };

  React.useEffect(() => {
    let mounted = true;
    if (mounted && team) {
      setName(team.name);
      setShortName(team.shortName);
      setType(team.type);
    }
  }, [team]);

  return (
    <Pane display="flex" justifyContent="center">
      <Pane elevation={2} className="form-container">
        <Heading size={700} marginBottom={24}>
          Adicionar Times
        </Heading>

        <form onSubmit={submitTeam} className="form">
          <TextInputField
            label="Team name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Small className="label">Gênero do Esporte</Small>
          <Select
            width="100%"
            className="select"
            marginBottom={24}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="" defaultChecked>
              ---
            </option>
            <option value="futebol">Futebol</option>
            <option value="basquete">Basquete</option>
            <option value="esports">Esports</option>
          </Select>

          <FileUploaderSingleUpload setFiles={setFiles} files={files} />

          <TextInputField
            label="Short name"
            placeholder="XTQ"
            value={shortName}
            onChange={(e) => setShortName(e.target.value.toUpperCase())}
          />

          <Pane marginTop={8}>
            <Button appearance="primary" width="100%" onClick={submitTeam}>
              Adicionar
            </Button>
          </Pane>

          {error.status && (
            <Alert intent={error.type} title={error.title}>
              {error.message}
            </Alert>
          )}
        </form>
      </Pane>
    </Pane>
  );
}

export default Teams;
