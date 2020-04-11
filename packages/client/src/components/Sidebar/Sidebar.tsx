import './sidebar.scss';

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Conversations } from '../../containers/conversations.container';

export const Sidebar = () => {
  const { conversations, loadConversations } = Conversations.useContainer();

  useEffect(() => {
    loadConversations();
  }, []);

  return <aside>
    <div>
      <Link className="button" to="/c/new">+</Link>
    </div>
    <ul>
      {conversations.map(c => <li>
        <Link to={`/c/${c.id}`}>
          {c.name}
        </Link>
      </li>)}
    </ul>
  </aside>;
};
