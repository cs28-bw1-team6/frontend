import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './utils/PrivateRoute';
import Login from './components/LoginForm'
import Register from './components/RegisterForm'
import RoomList from './components/RoomList'
import StartGame from './components/StartGame'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PrivateRoute path="/start" component={StartGame} />
          <PrivateRoute path="/rooms" component={RoomList} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
