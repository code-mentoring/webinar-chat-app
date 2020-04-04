import './sidebar.scss';

import React, { useEffect, useState } from 'react';

import { api } from '../../lib/API';
import { Link } from 'react-router-dom';
import { Conversation } from '../../lib/types';

export const Sidebar = () => {
  const [convos, setConvos] = useState<Conversation[]>([]);

  const getConversations = async () => {
    setConvos(await api.getConversations());
  };

  useEffect(() => {
    getConversations();
  }, []);

  return <aside>
    <div>
      <Link className="button" to="/c/new">+</Link>
    </div>
    <ul>
      {convos.map(c => <li>
        <Link to={`/c/${c.id}`}>
          {c.name}
        </Link>
      </li>)}
    </ul>
  </aside>;
};
