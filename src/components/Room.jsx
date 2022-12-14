import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { joinChessGame } from '../utils.js';
import GameContainer from './GameContainer.jsx';
import InviteLink from './InviteLink.jsx';
import CreateUsername from './CreateUsername.jsx';
import { socket } from '../connections/socket.js';

function GameRoom () {
  const { gameid } = useParams();
  const [username, setUsername, isCreator, setIsCreator] = useOutletContext();
  const [started, setStarted] = useState(false);
  const [rematch, setRematch] = useState(false);
  const [oRematch, setORematch] = useState(false);
  const [playerColor, setPlayerColor] = useState('');

  useEffect(() => {
    //! Issue where rematch doesn't change player color because setPlayerColor is not included in dependencies?
    socket.on('start game', (data) => {
      console.log('start!');
      setPlayerColor(() => {
        if (data.opponent === username) return data.oColor;
        return data.oColor === 'w' ? 'b' : 'w';
      });
      setRematch(false);
      setORematch(false);
    });
  }, []);
  useEffect(() => {
    socket.on('rematch', (req) => {
      if (req.username === username) {
        setRematch(true);
      } else {
        setORematch(true);
      }
    });
  }, []);
  useEffect(() => {
    if (rematch && oRematch) {
      socket.emit('rematch accepted', { gameId: gameid, username });
    }
  }, [rematch, oRematch]);

  useEffect(() => {
    joinChessGame(gameid, username);
  }, [gameid, username]);


  return (
    <div id='room'>
      {playerColor !== '' ? <GameContainer username={username} gameid={gameid} pColor={playerColor} /> : <InviteLink gameid={gameid} />}
    </div>
  )
}

const withUsername = (Component) => () => {
  const [username, setUsername, isCreator, setIsCreator] = useOutletContext();
  if (username.length === 0) return null;
  return <Component />;
}

export default withUsername(GameRoom);