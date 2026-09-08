import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { EDIT_NUMBER } from '../queries';

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [nameCopy, setNameCopy] = useState('');
  const [phone, setPhone] = useState('');

  const [changeNumber] = useMutation(EDIT_NUMBER, {
    onError: (error) => setError(error.message),
    onCompleted: (data) => {
      if (!data.editNumber) {
        setError(`Person ${nameCopy} not found`);
      }
      setNameCopy('');
    },
  });

  const submit = (event) => {
    event.preventDefault();

    setNameCopy(name);
    changeNumber({ variables: { name, phone } });

    setName('');
    setPhone('');
  };

  return (
    <div>
      <h2>Change number</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  );
};

export default PhoneForm;
