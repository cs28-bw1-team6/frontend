import React, { useState } from 'react';
import {Route, Switch } from 'react-router-dom'

import { UserContext } from './components/Contexts/UserContext'; // Current User Details
import { PlayerContext } from  './components/Contexts/PlayerContext'; // Other players

import PrivateRoute from './utils/PrivateRoute';
import Login from './components/auth/LoginForm'
import Register from './components/auth/RegisterForm'
import RoomList from './components/Game/RoomList'
import StartGame from './components/Game/StartGame'
import GameMap from './components/Game/GameMap';

function App() {

  const [user, setUser] = useState({
    uuid: '',
    name: '',
    title: '',
    description: '',
    error_msg: ''
  })

  const [players, setPlayers] = useState([])

  return (
      <div className="App">
        <UserContext.Provider value={{user, setUser}}>
          <PlayerContext.Provider value={{players, setPlayers}}>
            <Switch>
              <PrivateRoute path="/start" component={StartGame} />
              <PrivateRoute path="/rooms" component={RoomList} />
              <PrivateRoute path="/map" component={GameMap} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route component={Login} />
            </Switch>
          </PlayerContext.Provider>
        </UserContext.Provider>
      </div>
  );
}

export default App;
