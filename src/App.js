import React from 'react';
import {Route, Switch } from 'react-router-dom'

import PrivateRoute from './utils/PrivateRoute';
import Login from './components/auth/LoginForm'
import Register from './components/auth/RegisterForm'
import RoomList from './components/Game/RoomList'
import StartGame from './components/Game/StartGame'

function App() {
  return (
      <div className="App">
        <Switch>
          <PrivateRoute path="/start" component={StartGame} />
          <PrivateRoute path="/rooms" component={RoomList} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Login} />
        </Switch>
      </div>
  );
}

export default App;
