import {
  Alert,
  Button,
  Heading,
  Pane,
  Select,
  Small,
  TextInputField,
} from "evergreen-ui";
import React from "react";
import { WARNING } from "../../utils/constants";
import FileUploaderSingleUpload from "./FilleUploader";

function Teams() {
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [shortName, setShortName] = React.useState("");

  const [error, setError] = React.useState({
    title: "",
    message: "",
    status: false,
    type: "",
  });

  const submitTeam = () => {
    setError({
      title: "",
      message: "",
      status: false,
      type: "",
    });
    if (files.length === 0) {
      setError({
        title: "Error",
        message: "Please upload a file",
        status: true,
        type: WARNING,
      });
    } else if (name === "") {
      setError({
        title: "Error",
        message: "Please enter a name",
        status: true,
        type: WARNING,
      });
    } else if (shortName === "") {
      setError({
        title: "Error",
        message: "Please enter a short name",
        status: true,
        type: WARNING,
      });
    } else if (type === "") {
      setError({
        title: "Error",
        message: "Please select a type",
        status: true,
        type: WARNING,
      });
    } else {
      const team = {
        name,
        type,
        emblem: files[0],
        shortName,
      };
      console.log(team);
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
            label="Team name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Small className="label">Método de depósito</Small>
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
        </Pane>
      </Pane>
    </Pane>
  );
}

export default Teams;
