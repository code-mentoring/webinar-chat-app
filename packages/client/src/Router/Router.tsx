import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { HomePage } from '../pages/Home/Home.page';
import { history } from './history';

export const AppRouter = () => {
  return <Router history={history}>
    <Switch>
      <Route path='/' exact component={HomePage} />
    </Switch>
  </Router>
}
