import React from 'react';
import {
  Alert,
  Button,
  Heading,
  Pane,
  Select,
  Small,
  TextInputField,
  Dialog,
  Paragraph,
} from 'evergreen-ui';
import { UserContext } from '../../context/UserContext';
import { errorHandler } from '../../utils/error';
import {
  ERROR_GENERIC,
  ERROR_PAYMENT_METHOD,
  ERROR_PAYMENT_VALUE,
  ERROR_RESET,
} from '../../utils/constants';
import { userAddBalance } from '../../api/user';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { postBalance } from '../../api/historyBalance';

function DepositForm() {
  const { user, setUser } = React.useContext(UserContext);
  const [, setUserLocalStorage] = useLocalStorage('user', null);

  const [value, setValue] = React.useState(0);
  const [method, setMethod] = React.useState('');
  const [isDepositDialogShown, setIsDepositDialogShown] = React.useState(false);

  const [error, setError] = React.useState({
    title: '',
    message: '',
    status: false,
    type: '',
  });

  const handlePaymentModal = () => {
    errorHandler(ERROR_RESET, setError);
    if (value === 0 || value === '' || value === null) {
      errorHandler(ERROR_PAYMENT_VALUE, setError);
    } else if (method === '') {
      errorHandler(ERROR_PAYMENT_METHOD, setError);
    } else {
      setIsDepositDialogShown(true);
    }
  };

  const handlePayment = async () => {
    errorHandler(ERROR_RESET, setError);
    let { data: response } = await userAddBalance({
      id: user._id,
      balance: {
        amount: parseFloat(value),
      },
    });
    if (response.success) {
      // TODO: registrar método de pagamento, e data de pagamento
      setUserLocalStorage(response.user);
      setUser(response.user);
      setIsDepositDialogShown(false);
      postBalance({
        type: 'deposit',
        amount: parseFloat(value),
        userId: user._id,
        paymentMethod: method,
      });
    } else {
      errorHandler(ERROR_GENERIC, setError);
    }
  };

  return (
    <Pane display='flex' justifyContent='center'>
      <Pane className='form-container'>
        <Heading className='title-h2'>Depositar</Heading>

        <Pane className='form-registration'>
          <TextInputField
            label='Valor'
            type='number'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Pane>
            <Small className='label'>Método de depósito</Small>
            <Select
              className='select'
              onChange={(event) => setMethod(event.target.value)}
            >
              <option value='' defaultChecked>
                ---
              </option>
              <option value='pix'>PIX</option>
              <option value='transferencia-bancaria'>
                Transferência Bancária
              </option>
              <option value='paypal'>Paypal</option>
            </Select>
          </Pane>
        </Pane>

        <Pane marginTop={8}>
          <Button appearance='primary' onClick={handlePaymentModal}>
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

      <Dialog
        isShown={isDepositDialogShown}
        title='Perfil'
        hasCancel={false}
        hasFooter={false}
        onCloseComplete={() => setIsDepositDialogShown(false)}
      >
        <Pane display='flex' justifyContent='center'>
          <Pane marginBottom={32} textAlign='center'>
            <Heading size={400} marginBottom={16}>
              Escaneie o código abaixo para realizar o depósito
            </Heading>
            <Paragraph>
              Tem certeza que deseja depositar R${value} na sua conta via{' '}
              {method}?
            </Paragraph>
            <Pane display='flex' justifyContent='center'>
              <img src='https://i.imgur.com/GK9hs91.png' alt='QR CODE' />
            </Pane>

            <Pane marginTop={8}>
              <Button appearance='primary' onClick={handlePayment}>
                Finalizar o Pagamento
              </Button>
            </Pane>
          </Pane>
        </Pane>
      </Dialog>
    </Pane>
  );
}

export default DepositForm;
