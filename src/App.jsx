import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import Board from './components/Board.jsx';
import Nav from './components/Nav.jsx';
import CreateUsername from './components/CreateUsername.jsx';
import ResultModal from './components/ResultModal.jsx';

export default function App() {
  const [username, setUsername] = useState('');
  const [isCreator, setIsCreator] = useState(false);

  return (
    <div className='app'>
      <Nav username={username} setIsCreator={setIsCreator} />
      {username.length < 1 ? <CreateUsername setUsername={setUsername} /> : null}
      <Outlet context={[username, setUsername, isCreator, setIsCreator]} />
    </div>
  )
}