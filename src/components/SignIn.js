import React from "react";
import { Link } from "react-router-dom";
import { Button, Pane, TextInputField, Heading, Alert } from "evergreen-ui";
import "../css/sign.css";
import { validateEmail } from "../utils/regex";
import { SUCCESS, WARNING } from "../utils/constants";
import { browserDetect } from "../utils/utils";

function SignInView() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [error, setError] = React.useState({
    title: "",
    message: "",
    status: false,
    type: "",
  });

  const handleSignIn = () => {
    setError({
      title: "",
      message: "",
      status: false,
      type: "",
    });

    const emailValidated = validateEmail(email);

    if (email === "" || password === "") {
      setError({
        title: "Error",
        message: "Please fill all the fields",
        status: true,
        type: WARNING,
      });
    } else if (!emailValidated) {
      setError({
        title: "Invalid email",
        message: "Please enter a valid email",
        status: true,
        type: WARNING,
      });
    } else if (password !== "qqQQ11") {
      setError({
        title: "Wrong password",
        message: "Please try again",
        status: true,
        type: WARNING,
      });
    } else {
      setError({
        title: "Sign in successful!",
        message: "",
        status: true,
        type: SUCCESS,
      });
      let user = {
        email,
        password,
        lastLogin: new Date(),
        browser: browserDetect(),
      };
      console.log(user);
    }
  };

  return (
    <Pane display="flex" justifyContent="center">
      <Pane elevation={2} className="form-container">
        <Heading size={700} marginBottom={24}>
          Login
        </Heading>

        <Pane className="form">
          <TextInputField
            type="email"
            label="E-mail"
            placeholder="Text input placeholder..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInputField
            type="password"
            label="Password"
            placeholder="Text input placeholder..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Pane>

        <Pane marginTop={8}>
          <Button appearance="primary" width="100%" onClick={handleSignIn}>
            Login
          </Button>
        </Pane>

        <Pane display="flex" justifyContent="flex-end">
          <Link to="/signup">
            <Button marginTop={32} appearance="minimal">
              I don't have an account
            </Button>
          </Link>
        </Pane>

        {error.status && (
          <Alert intent={error.type} title={error.title}>
            {error.message}
          </Alert>
        )}
      </Pane>
    </Pane>
  );
}

export default SignInView;
