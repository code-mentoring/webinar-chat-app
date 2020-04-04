import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { HomePage } from '../pages/Home/Home.page';
import { history } from './history';
import { ConversationPage } from '../pages/Conversation/Conversation.page';
import { LoginPage } from '../pages/Login/Login.page';

export const AppRouter = () => {
  return <Router history={history}>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/c/:conversationID" exact component={ConversationPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  </Router>;
};
