import React, { useEffect, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { api } from '../lib/API';
import { ConversationPage } from '../pages/Conversation/Conversation.page';
import { HomePage } from '../pages/Home/Home.page';
import { LoginPage } from '../pages/Login/Login.page';
import { SignupPage } from '../pages/Signup/Signup.page';
import { history } from './history';

export const AppRouter = () => {
  const [loading, setLoading] = useState(true);

  const loadMe = async() => {
    await api.me();
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) setLoading(false);
    else loadMe();
  }, []);

  if (loading) return <span>Loading...</span>;

  return <Router history={history}>
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/c/:conversationID" exact component={ConversationPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
    </Switch>
  </Router>;
};
