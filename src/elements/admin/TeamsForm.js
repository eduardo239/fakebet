import React from 'react';
import {
  Alert,
  Button,
  Dialog,
  Heading,
  Pane,
  Paragraph,
  SelectField,
  TextInputField,
} from 'evergreen-ui';
import FileUploaderSingleUpload from './FilleUploader';
import { TeamContext } from '../../context/TeamContext';
import { getTeams, postTeam, updateTeam, uploadImage } from '../../api/team';
import {
  ERROR_RESET,
  SUCCESS_TEAM_REGISTER,
  ERROR_EMPTY_TEAM_NAME,
  ERROR_ABBREVIATED_NAME,
  ERROR_TEAM_TYPE,
  ERROR_DB_MESSAGE,
} from '../../utils/constants';
import { errorHandler } from '../../utils/error';

function TeamsForm() {
  const {
    team,
    setTeams,
    setTeam,
    files,
    setFiles,
    setIsUpdating,
    isUpdating,
    resetTeam,
    sportsData,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    errorHandler(ERROR_RESET, setError);

    let validateEmptyTeamName = team.name.trim() !== '';
    let validateEmptyAbbreviation = team.shortName !== '';
    let validateTeamType = team.type !== '';

    if (
      validateEmptyTeamName &&
      validateEmptyAbbreviation &&
      validateTeamType
    ) {
      let { data: teamResponse } = await postTeam(team);

      // upload team
      if (teamResponse.success) {
        const newTeamFile = new FormData();
        newTeamFile.append('emblem', files[0]);

        let { team } = teamResponse;
        let { data: emblemResponse } = await uploadImage(newTeamFile, team._id);
        // upload image
        if (emblemResponse.success) {
          let { data: teamsResponse } = await getTeams();
          if (teamsResponse.success) {
            setTeams(teamsResponse.teams);
            errorHandler(SUCCESS_TEAM_REGISTER, setError);
            resetTeam();
            setTimeout(() => {
              errorHandler(ERROR_RESET, setError);
            }, 3000);
          } else {
            errorHandler(ERROR_DB_MESSAGE, setError, teamsResponse.message);
          }
        } else {
          errorHandler(ERROR_DB_MESSAGE, setError, emblemResponse.message);
        }
      }
    } else if (!validateEmptyTeamName) {
      errorHandler(ERROR_EMPTY_TEAM_NAME, setError);
    } else if (!validateEmptyAbbreviation) {
      errorHandler(ERROR_ABBREVIATED_NAME, setError);
    } else if (!validateTeamType) {
      errorHandler(ERROR_TEAM_TYPE, setError);
    }
  };

  return (
    <Pane>
      <Pane className='form-container' alignSelf='center'>
        <Heading className='title-h2'>Adicionar Times</Heading>

        <Pane className='form-registration'>
          <TextInputField
            label='Nome do Time'
            placeholder='O nome do time'
            value={team.name}
            onChange={(e) => setTeam({ ...team, name: e.target.value })}
          />

          <Pane>
            <SelectField
              label='Gênero do Esporte'
              name='type'
              onChange={(e) => setTeam({ ...team, type: e.target.value })}
            >
              <option value='' defaultValue>
                ---
              </option>
              {sportsData?.sports?.length > 0 &&
                sportsData?.sports?.map((sport) => (
                  <option key={sport._id} value={sport._id}>
                    {sport.name}
                  </option>
                ))}
            </SelectField>
          </Pane>

          <TextInputField
            label='Nome Abreviado'
            placeholder='Um nome curto com até 3 caracteres'
            value={team.shortName}
            onChange={(e) =>
              setTeam({ ...team, shortName: e.target.value.toUpperCase() })
            }
            maxLength={3}
          />

          <Pane className='grid--span3'>
            <FileUploaderSingleUpload setFiles={setFiles} files={files} />
          </Pane>
        </Pane>

        <Pane marginTop={8}>
          <Button marginRight={16} appearance='primary' onClick={handleSubmit}>
            Adicionar
          </Button>
          <Button
            disabled={!isUpdating}
            appearance='minimal'
            onClick={() => setIsShownUpdateModal(true)}
          >
            Atualizar
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

      <Dialog
        isShown={isShownUpdateModal}
        title='Remover Time'
        intent='primary'
        cancelLabel='Cancelar'
        onCloseComplete={() => setIsShownUpdateModal(false)}
        confirmLabel='Atualizar'
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
