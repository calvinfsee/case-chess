import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CreateNewGame from './components/CreateNewGame.jsx';
import Room from './components/Room.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/game/:gameid',
        element: <Room />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router}/>);
