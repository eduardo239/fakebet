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

function WithdrawalForm() {
  const [value, setValue] = React.useState(0);
  const [method, setMethod] = React.useState('');
  const [agency, setAgency] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [accountType, setAccountType] = React.useState('');

  const submitWithdrawal = () => {
    console.log(
      value +
        ' ' +
        method +
        ' ' +
        agency +
        ' ' +
        accountNumber +
        ' ' +
        accountType
    );
  };

  return (
    <Pane display="flex" justifyContent="center">
      <Pane elevation={2} className="money-container">
        <Heading size={700} marginBottom={24}>
          Retirada
        </Heading>
        <Pane className="money-form">
          <TextInputField
            label="Valor"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            marginBottom={0}
          />

          <Small className="label">Método de Retirada</Small>
          <Select
            className="select"
            onChange={(event) => setMethod(event.target.value)}
          >
            <option value="bradesco">Banco</option>
            <option value="santander">Paypal</option>
          </Select>

          <Small className="label">Agência Bancária</Small>
          <Select
            className="select"
            onChange={(event) => setMethod(event.target.value)}
          >
            <option value="bradesco">Bradesco</option>
            <option value="santander">Santander</option>
            <option value="nubank">Nubank</option>
          </Select>

          <TextInputField
            label="Número da Agência"
            type="number"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
            marginBottom={0}
          />

          <TextInputField
            label="Número da Conta"
            type="number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            marginBottom={0}
          />

          <Small className="label">Tipo da Conta</Small>
          <Select
            className="select"
            onChange={(event) => setAccountType(event.target.value)}
          >
            <option value="bradesco">Conta Corrente</option>
            <option value="santander">Conta Poupança</option>
          </Select>
        </Pane>
        <Pane marginTop={24}>
          <Button appearance="primary" width="100%" onClick={submitWithdrawal}>
            Continuar
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default WithdrawalForm;
