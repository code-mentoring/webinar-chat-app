import React, { useEffect, useState } from 'react';

import { api } from '../../lib/API';
import {Conversation, Message} from '../../lib/types';


export const HomePage = () => {

  const [conversation, updateConversation] = useState<Conversation>();
  const [messages, updateMessages] = useState<Message[]>([]);

  const loadInitialData = async() => {
    const conversation = await api.getConversation("c64ef855-e90d-45b8-9cf2-658afb0a4e81");
    const messages = await api.getMessages("c64ef855-e90d-45b8-9cf2-658afb0a4e81");
    updateConversation(conversation);
    updateMessages(messages);
  }

  useEffect(
    () => { loadInitialData() }, // Watch these values for changes (Not DEEP change)
    [] // If I pass nothing, it only gets called on component initialization
  );

  return <div>
    {conversation && <h1>Conversation {conversation.name}</h1>}
    <ul className="messages">
      {messages.map(m =>
        <li>{m.content}</li>
      )}
    </ul>
  </div>
}
