import './lib/API';
import './lib/sockets';
import './styles/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import { Conversations } from './containers/conversations.container';
import { AppRouter } from './Router/Router';
import { Messages } from './containers/messages.container';

(async () =>
  ReactDOM.render(
    <Conversations.Provider>
      <Messages.Provider>
        <AppRouter />
      </Messages.Provider>
    </Conversations.Provider>,
    document.getElementById('app')
  )
)();
