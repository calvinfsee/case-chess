import { useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Board from './components/Board.jsx';
import CreateNewGame from './components/CreateNewGame.jsx';
import GameContainer from './components/GameContainer.jsx';

export default function App() {
  const [username, setUsername] = useState('');
  const [isCreator, setIsCreator] = useState(false);

  return (
    <div className="App">
      {/* <Board pColor={'w'} /> */}
      <Router>
        <Routes>
          <Route path='/' exact>
            <CreateNewGame setUsername={setUsername} username={username} isCreator={isCreator} setIsCreator={setIsCreator} />
          </Route>
          <Route path='/game/:gameid' exact>
            <GameContainer setUsername={setUsername} username={username} isCreator={isCreator} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}