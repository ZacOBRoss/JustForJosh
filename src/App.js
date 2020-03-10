import React from 'react';
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';

import Home from './components/home'
import GameOfLife from './components/GameOfLife.js'

const App = () => (
  <div className='app'>
    <h1>React Router Demo</h1>
    <Navigation />
    <Main />
  </div>
);

const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/GameOfLife'>Game of Life</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/GameOfLife' component={GameOfLife}></Route>
  </Switch>
)

export default App;