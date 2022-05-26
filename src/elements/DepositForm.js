import React from 'react';
import {
  Button,
  Heading,
  Pane,
  Select,
  Small,
  TextInputField,
} from 'evergreen-ui';

function DepositForm() {
  const [value, setValue] = React.useState(0);
  const [method, setMethod] = React.useState('');

  const submitDeposit = () => {
    console.log(value, method);
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
          <Button appearance="primary" width="100%" onClick={submitDeposit}>
            Continuar
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default DepositForm;
