import { React, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { socket } from '../connections/socket.js';
import { useNavigate } from 'react-router-dom';

export default function CreateNewGame ({ username, setIsCreator }) {
  const navigate = useNavigate();
  const handleClick  = useCallback(() => {
    if (username.length > 0) {
      const newRoomId = uuid();
      setIsCreator(true);
      socket.emit('createNewGame', newRoomId);
      navigate('/game/' + newRoomId);
    }
  }, [username, navigate]);


  return (
      <button id='create-game-btn' onClick={handleClick}>
        Create Game
      </button>
  );
}