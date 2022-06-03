import React from 'react';
import {
  Alert,
  Button,
  Dialog,
  Heading,
  Pane,
  Paragraph,
  Select,
  Small,
  TextInputField,
} from 'evergreen-ui';
import FileUploaderSingleUpload from './FilleUploader';
import { getTeams, postTeam, updateTeam, uploadImage } from '../../api/team';
import { TeamContext } from '../../context/TeamContext';
import { WARNING } from '../../utils/constants';

function TeamsForm() {
  const {
    team,
    setTeams,
    setTeam,
    resetTeam,
    files,
    setFiles,
    setIsUpdating,
    isUpdating,
  } = React.useContext(TeamContext);
  const [isShownUpdateModal, setIsShownUpdateModal] = React.useState(false);

  const [error, setError] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const handleEdit = async () => {
    await updateTeam(team);
    setIsUpdating(false);
    setIsShownUpdateModal(false);
    let { data: response } = await getTeams();
    if (response.success) {
      setTeams(response.teams);
    }
  };

  const submitTeam = async (e) => {
    e.preventDefault();
    setError({
      title: '',
      message: '',
      status: false,
      type: '',
    });

    if (team.name === '') {
      setError({
        title: 'Error',
        message: 'O time precisa ter um nome',
        status: true,
        type: WARNING,
      });
    } else if (team.shortName === '') {
      setError({
        title: 'Error',
        message: 'O time precisa ter um nome curto',
        status: true,
        type: WARNING,
      });
    } else if (team.type === '') {
      setError({
        title: 'Error',
        message: 'O time precisa ter um tipo de esporte',
        status: true,
        type: WARNING,
      });
    } else {
      let { data: teamResponse } = await postTeam(team);

      if (teamResponse.success) {
        const newTeamFile = new FormData();
        newTeamFile.append('emblem', files[0]);

        let { team } = teamResponse;
        let { data: emblemResponse } = await uploadImage(newTeamFile, team._id);

        if (emblemResponse.success) {
          resetTeam();
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

  return (
    <Pane display="flex" justifyContent="center">
      <Pane elevation={2} className="form-container">
        <Heading size={700} marginBottom={24}>
          Adicionar Times
        </Heading>

        <Pane className="form">
          <TextInputField
            label="Nome do Time"
            placeholder="O nome do time"
            value={team.name}
            onChange={(e) => setTeam({ ...team, name: e.target.value })}
          />

          <Pane>
            <Small className="label">Gênero do Esporte</Small>
            <Select
              marginTop={8}
              width="100%"
              className="select"
              marginBottom={24}
              onChange={(event) =>
                setTeam({ ...team, type: event.target.value })
              }
            >
              <option value="" defaultChecked>
                ---
              </option>
              <option value="futebol">Futebol</option>
              <option value="basquete">Basquete</option>
              <option value="esports">Esports</option>
            </Select>
          </Pane>

          <TextInputField
            label="Nome Abreviado"
            placeholder="Um nome curto com até 3 caracteres"
            value={team.shortName}
            onChange={(e) =>
              setTeam({ ...team, shortName: e.target.value.toUpperCase() })
            }
            maxLength={3}
          />

          <Pane className="form--span-3">
            <FileUploaderSingleUpload setFiles={setFiles} files={files} />
          </Pane>
        </Pane>
        <Pane marginTop={8}>
          <Button marginRight={16} appearance="primary" onClick={submitTeam}>
            Adicionar
          </Button>
          <Button
            disabled={!isUpdating}
            appearance="minimal"
            onClick={setIsShownUpdateModal}
          >
            Atualizar
          </Button>
        </Pane>

        {error.status && (
          <Alert intent={error.type} title={error.title}>
            {error.message}
          </Alert>
        )}
      </Pane>

      <Dialog
        isShown={isShownUpdateModal}
        title="Remover Time"
        intent="primary"
        cancelLabel="Cancelar"
        onCloseComplete={() => setIsShownUpdateModal(false)}
        confirmLabel="Atualizar"
        onConfirm={() => handleEdit(team)}
      >
        <Paragraph size={300} marginTop={12}>
          Você tem certeza que deseja atualizar ?
        </Paragraph>
      </Dialog>
    </Pane>
  );
}

export default TeamsForm;
