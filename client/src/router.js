import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import './App.css';
import Home from './components/Home';
import Prereqcheck from './components/Prereqcheck';

class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/prereqcheck' component={Prereqcheck}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
