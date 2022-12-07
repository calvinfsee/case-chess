import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateNewGame from './CreateNewGame.jsx';

export default function Nav ({ username, setIsCreator }) {
  const navigate = useNavigate();
  const handleHomeClick = useCallback(() => {
    navigate('/');
  }, [navigate]);
  return (
    <div id='nav'>
      <h1 onClick={handleHomeClick}>Chess Dot Case</h1>
      <CreateNewGame username={username} setIsCreator={setIsCreator} />
    </div>
  );
}