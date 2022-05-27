import React from "react";
import {
  Alert,
  Button,
  Heading,
  Pane,
  Select,
  Small,
  TextInputField,
} from "evergreen-ui";
import { SUCCESS, WARNING } from "../utils/constants";

const user = {
  username: "joe1",
  email: "email@email.com",
  bets: [],
  balance: {
    amount: 0,
    currency: "BRL",
    lastDeposit: null,
    lastWithdraw: null,
  },
};

function DepositForm() {
  const [value, setValue] = React.useState(0);
  const [method, setMethod] = React.useState("");

  const [error, setError] = React.useState({
    title: "",
    message: "",
    status: false,
    type: "",
  });

  const nextPayment = () => {
    setError({
      title: "",
      message: "",
      status: false,
      type: "",
    });

    console.log(value, method);

    if (value === 0 || method === "") {
      setError({
        title: "Error",
        message: "Please fill all the fields",
        status: true,
        type: WARNING,
      });
    } else {
      setError({
        title: "Success",
        message: "Payment successful",
        status: true,
        type: SUCCESS,
      });

      user.balance.amount += parseFloat(value);
      user.balance.lastDeposit = new Date();

      console.log(user);
    }
  };

  return (
    <Pane display="flex" justifyContent="center">
      <Pane elevation={2} className="form-container">
        <Heading size={700} marginBottom={24}>
          Depositar
        </Heading>
        <Pane className="form">
          <TextInputField
            label="Valor"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Small className="label">Método de depósito</Small>
          <Select
            className="select"
            marginBottom={24}
            onChange={(event) => setMethod(event.target.value)}
          >
            <option value="pix">PIX</option>
            <option value="transferencia-bancaria">
              Transferência Bancária
            </option>
            <option value="paypal">Paypal</option>
          </Select>
        </Pane>

        <Pane marginTop={8}>
          <Button appearance="primary" width="100%" onClick={nextPayment}>
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

export default DepositForm;
