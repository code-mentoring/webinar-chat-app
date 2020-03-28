import './conversation.page.scss';

import React, { useEffect, useState } from 'react';

import { api } from '../../lib/API';
import {Conversation, Message} from '../../lib/types';
import { useParams } from 'react-router';
import { SendMessage } from './SendMessage';

interface Params {
  conversationID: string;
}

export const ConversationPage = () => {
  const params = useParams<Params>();

  const [conversation, updateConversation] = useState<Conversation>();
  const [messages, updateMessages] = useState<Message[]>([]);

  const loadInitialData = async() => {
    const conversation = await api.getConversation(params.conversationID);
    if (!conversation) return;
    const messages = await api.getMessages(params.conversationID);
    updateConversation(conversation);
    updateMessages(messages);
  }

  useEffect(
    () => { loadInitialData() }, // Watch these values for changes (Not DEEP change)
    [] // If I pass nothing, it only gets called on component initialization
  );

  return <main className="conversation">

    <header>{conversation
      ? <>Conversation {conversation.name}</>
      : <h1>Could not find conversation</h1>
    }
    </header>

    <ul className="messages">
      {messages.map(m =>
        <li>
          <span>{m.content}</span>
        </li>
      )}
    </ul>

    <footer>
      <SendMessage
        conversationId={params.conversationID}
        onNewMessage={message => {
          console.log(message);

          updateMessages(m => [...m, message])
        }}
      />
    </footer>
  </main>
}
