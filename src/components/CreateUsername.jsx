import { useState, useCallback } from 'react';

export default function CreateUsername ({ setUsername }) {
  const [name, setName] = useState('');
  const handleSubmit = useCallback(() => {
    if (name.length > 0) setUsername(name);
  }, [name, setUsername]);

  return (
    <div id='create-username'>
        <h2>Your Username:</h2>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}