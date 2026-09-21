import { useMutation, useQuery } from '@apollo/client/react';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import { useState } from 'react';

const Authors = (props) => {
  const [inputName, setInputName] = useState('');
  const [inputBirthyear, setInputBirthyear] = useState('');

  const result = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  const submitBirthyear = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: inputName, born: Number(inputBirthyear) },
    });

    setInputBirthyear('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submitBirthyear}>
        <div>
          name
          <select
            value={inputName}
            onChange={({ target }) => setInputName(target.value)}
          >
            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            type="number"
            value={inputBirthyear}
            onChange={({ target }) => setInputBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
