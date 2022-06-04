import {
  ERROR_ABBREVIATED_NAME,
  ERROR_DB_MESSAGE,
  ERROR_EMPTY_PASSWORD,
  ERROR_EMPTY_TEAM_NAME,
  ERROR_EMPTY_USERNAME,
  ERROR_GENERIC,
  ERROR_INVALID_EMAIL,
  ERROR_INVALID_PASSWORD,
  ERROR_PASSWORD_DOES_NOT_MATCH,
  ERROR_RESET,
  ERROR_TEAM_REGISTER,
  ERROR_TEAM_TYPE,
  ERROR_TERMS,
  ERROR_USERNAME_MIN_LENGTH,
  SUCCESS,
  SUCCESS_TEAM_REGISTER,
  WARNING,
} from "./constants";

export const errorHandler = (error, setError, response) => {
  switch (error) {
    case ERROR_RESET:
      setError({
        title: "",
        message: "",
        status: false,
        type: "",
      });
      break;

    // - - - - - - - - - - - DB ERROR - - - - - - - - - - -
    case ERROR_DB_MESSAGE:
      setError({
        title: "Erro ao realizar operação.",
        message: response || ERROR_GENERIC,
        status: true,
        type: WARNING,
      });
      break;
    // - - - - - - - - - - - REQUIRED ERROR - - - - - - - - - - -
    case ERROR_USERNAME_MIN_LENGTH:
      setError({
        title: "Erro ao cadastrar usuário",
        message: ERROR_USERNAME_MIN_LENGTH,
        status: true,
        type: WARNING,
      });
      break;
    case ERROR_TERMS:
      setError({
        title: "Erro - Termos de uso não aceitos",
        message: ERROR_TERMS,
        status: true,
        type: WARNING,
      });
      break;
    case ERROR_PASSWORD_DOES_NOT_MATCH:
      setError({
        title: "Erro - Senhas não conferem",
        message: ERROR_PASSWORD_DOES_NOT_MATCH,
        status: true,
        type: WARNING,
      });
      break;
    // - - - - - - - - - - - INVALID ERROR - - - - - - - - - - -
    case ERROR_INVALID_EMAIL:
      setError({
        title: "Erro - Email inválido",
        message: "Por favor, preencha um email válido",
        status: true,
        type: WARNING,
      });
      break;
    case ERROR_INVALID_PASSWORD:
      setError({
        title: "Erro - Senha inválida",
        message: ERROR_INVALID_PASSWORD,
        status: true,
        type: WARNING,
      });
      break;

    // - - - - - - - - - - - EMPTY ERROR - - - - - - - - - - -
    case ERROR_EMPTY_PASSWORD:
      setError({
        title: "Erro - Senha vazia",
        message: ERROR_EMPTY_PASSWORD,
        status: true,
        type: WARNING,
      });
      break;

    case ERROR_EMPTY_USERNAME:
      setError({
        title: "Erro - Nome de usuário vazio",
        message: ERROR_EMPTY_USERNAME,
        status: true,
        type: WARNING,
      });
      break;
    // - - - - - - - - - - - TEAMS ERROR - - - - - - - - - - -
    // FIXME: this error is not being handled
    case ERROR_EMPTY_TEAM_NAME:
      setError({
        title: "Erro - Nome do time vazio",
        message: ERROR_EMPTY_TEAM_NAME,
        status: true,
        type: WARNING,
      });
      break;

    case ERROR_ABBREVIATED_NAME:
      setError({
        title: "Erro!",
        message: ERROR_ABBREVIATED_NAME,
        status: true,
        type: WARNING,
      });
      break;
    case ERROR_TEAM_TYPE:
      setError({
        title: "Erro!",
        message: ERROR_TEAM_TYPE,
        status: true,
        type: WARNING,
      });
      break;
    case ERROR_TEAM_REGISTER:
      setError({
        title: "Erro!",
        message: ERROR_TEAM_REGISTER,
        status: true,
        type: WARNING,
      });
      break;

    case SUCCESS_TEAM_REGISTER:
      setError({
        title: "Sucesso!",
        message: SUCCESS_TEAM_REGISTER,
        status: true,
        type: SUCCESS,
      });
      break;

    // - - - - - - - - - - - DEFAULT ERROR - - - - - - - - - - -
    default:
      setError({
        title: "Erro!",
        message: "Ocorreu um erro ao realizar a operação XXX.",
        status: true,
        type: WARNING,
      });
      break;
  }
};
