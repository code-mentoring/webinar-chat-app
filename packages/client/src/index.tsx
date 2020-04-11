import './styles/base.scss';
import './lib/API';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './Router/Router';
import { Conversations } from './containers/conversations.container';

(async () =>
  ReactDOM.render(
    <Conversations.Provider>
      <AppRouter />
    </Conversations.Provider>,
    document.getElementById('app')
  )
)();
