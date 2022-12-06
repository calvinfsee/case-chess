import { React, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { socket } from '../connections/socket.js';
import { Navigate } from 'react-router-dom'

export default function CreateNewGame ({ setUsername, username, setIsCreator }) {
  const [name, setName] = useState('');
  const [gameId, setGameId] = useState('');
  const handleSubmit  = useCallback(() => {
    if (name.length > 0) {
      const newRoomId = uuid();
      setUsername(name);
      setIsCreator(true);
      setGameId(newRoomId);
    }
  }, [name]);
  return (
    <React.Fragment>
      {
      username.length > 0 ? <Navigate to={'/game/' + gameId} /> :
        <div id='create-new-game'>
        <h2>Your Username:</h2>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>}
    </React.Fragment>
  );
}