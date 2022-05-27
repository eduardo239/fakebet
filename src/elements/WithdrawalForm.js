import React from "react";
import {
  Button,
  Heading,
  Pane,
  Select,
  Small,
  TextInputField,
  Alert,
} from "evergreen-ui";
import { SUCCESS, WARNING } from "../utils/constants";

const user = {
  username: "joe1",
  email: "email@email.com",
  bets: [],
  balance: {
    amount: 2304.5,
    currency: "BRL",
    lastDeposit: null,
    lastWithdraw: null,
  },
};

function WithdrawalForm() {
  const [value, setValue] = React.useState(0);
  const [method, setMethod] = React.useState("");
  const [agency, setAgency] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [accountType, setAccountType] = React.useState("");

  const [error, setError] = React.useState({
    title: "",
    message: "",
    status: false,
    type: "",
  });

  const submitWithdrawal = () => {
    setError({
      title: "",
      message: "",
      status: false,
      type: "",
    });

    if (
      value === 0 ||
      method === "" ||
      agency === "" ||
      accountNumber === "" ||
      accountType === ""
    ) {
      setError({
        title: "Error",
        message: "Please fill all the fields",
        status: true,
        type: WARNING,
      });
    } else if (value < 0) {
      setError({
        title: "Error",
        message: "Please enter a valid value",
        status: true,
        type: WARNING,
      });
    } else if (value > user.balance.amount) {
      setError({
        title: "Error",
        message: "You don't have enough money to withdraw",
        status: true,
        type: WARNING,
      });
    } else {
      setError({
        title: "Success",
        message: "Withdrawal successful",
        status: true,
        type: SUCCESS,
      });

      user.balance.amount -= parseFloat(value);
      user.balance.lastWithdraw = new Date();

      console.log(user);
    }
  };

  return (
    <Pane display="flex" justifyContent="center">
      <Pane elevation={2} className="form-container">
        <Heading size={700} marginBottom={24}>
          Retirada
        </Heading>

        <Pane marginBottom={24}>
          <Heading size={400} fontFamily="monospace">
            Total: R$ {user.balance.amount}
          </Heading>
        </Pane>

        <Pane className="form">
          <TextInputField
            label="Valor"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Small className="label">Método de Retirada</Small>
          <Select
            className="select"
            marginBottom={24}
            onChange={(event) => setMethod(event.target.value)}
          >
            <option value="" defaultChecked>
              ---
            </option>
            <option value="bradesco">Banco</option>
            <option value="santander">Paypal</option>
          </Select>

          <Small className="label">Agência Bancária</Small>
          <Select
            className="select"
            marginBottom={24}
            onChange={(event) => setMethod(event.target.value)}
          >
            <option value="" defaultChecked>
              ---
            </option>
            <option value="bradesco">Bradesco</option>
            <option value="santander">Santander</option>
            <option value="nubank">Nubank</option>
          </Select>

          <TextInputField
            label="Número da Agência"
            type="number"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
          />

          <TextInputField
            label="Número da Conta"
            type="number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />

          <Small className="label">Tipo da Conta</Small>
          <Select
            className="select"
            marginBottom={24}
            onChange={(event) => setAccountType(event.target.value)}
          >
            <option value="" defaultChecked>
              ---
            </option>
            <option value="bradesco">Conta Corrente</option>
            <option value="santander">Conta Poupança</option>
          </Select>
        </Pane>
        <Pane marginTop={8}>
          <Button appearance="primary" width="100%" onClick={submitWithdrawal}>
            Continuar
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
    </Pane>
  );
}

export default WithdrawalForm;
