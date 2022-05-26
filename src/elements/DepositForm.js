import React from 'react';
import {
  Button,
  Heading,
  Pane,
  Select,
  Small,
  TextInputField,
} from 'evergreen-ui';
import '../css/money.css';

function DepositForm() {
  const [value, setValue] = React.useState(0);
  const [method, setMethod] = React.useState('');

  const submitDeposit = () => {
    console.log(value, method);
  };

  return (
    <Pane display="flex" justifyContent="center">
      <Pane elevation={2} className="money-container">
        <Heading size={700} marginBottom={24}>
          Depositar
        </Heading>
        <Pane className="money-form">
          <TextInputField
            label="Valor"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            marginBottom={0}
          />

          <Small className="label">Método de depósito</Small>
          <Select
            className="select"
            onChange={(event) => setMethod(event.target.value)}
          >
            <option value="pix">PIX</option>
            <option value="transferencia-bancaria">
              Transferência Bancária
            </option>
            <option value="paypal">Paypal</option>
          </Select>
        </Pane>
        <Pane marginTop={24}>
          <Button appearance="primary" width="100%" onClick={submitDeposit}>
            Continuar
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default DepositForm;
