import React, { useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { joinChessGame } from '../utils.js';
import GameContainer from './GameContainer.jsx';
import CreateUsername from './CreateUsername.jsx';

function GameRoom () {
  const { gameid } = useParams();
  const [username, setUsername, isCreator, setIsCreator] = useOutletContext();
  useEffect(() => {
    joinChessGame(gameid, username, isCreator);
  }, [gameid]);


  return (
    <div id='room'>
      <GameContainer username={username} gameid={gameid} />
    </div>
  )
}

const withUsername = (Component) => () => {
  const [username, setUsername, isCreator, setIsCreator] = useOutletContext();
  if (username.length === 0) return null;
  return <Component />;
}

export default withUsername(GameRoom);