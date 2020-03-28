import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import { HomePage } from '../pages/Home/Home.page';
import { history } from './history';

export const AppRouter = () => {
  return <Router history={history}>
    <Switch>
      <Route path='/' component={HomePage} />
    </Switch>
  </Router>
}
