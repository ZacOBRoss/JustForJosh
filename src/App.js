import React from 'react';
import './App.css';
import { NavLink, Switch, Route } from 'react-router-dom';

import Home from './components/home'
import GameOfLife from './components/GameOfLife'
import Pong from './components/pong/Pong'
import SpaceInvaders from './components/SpaceInvaders/SpaceInvaders'
import Tetris from './components/Tetris/Tetris'

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
      <li>
        <NavLink exact activeClassName="current" to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to='/GameOfLife'>
          Game of Life
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to='/Pong'>
          Pong
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to='/SpaceInvaders'>
          Space Invaders
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="current" to='/Tetris'>
          Tetris
        </NavLink>
      </li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/GameOfLife' component={GameOfLife}></Route>
    <Route exact path='/Pong' component={Pong}></Route>
    <Route exact path='/SpaceInvaders' component={SpaceInvaders}></Route>
    <Route exact path='/Tetris' component={Tetris}></Route>
  </Switch>
)


export default App;
