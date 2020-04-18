import './conversation.page.scss';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { api } from '../../lib/API';
import { Conversation, Message } from '../../lib/types';
import { AddUserToConvoModal } from '../../modals/AddUserToConvo/AddUserToConvo.modal';
import { CreateConversation } from './CreateConversation';
import { SendMessage } from './SendMessage';

interface Params {
  conversationID: string;
}

export const ConversationPage = () => {
  const params = useParams<Params>();

  const [conversation, updateConversation] = useState<Conversation>();
  const [messages, updateMessages] = useState<Message[]>([]);

  // Whenever the `params.conversationID` changes, check to see if we are creating new convo
  const isNew = useMemo(
    () => params.conversationID === 'new', // Returns boolean
    [params.conversationID]
  );


  const loadInitialData = async () => {
    if (isNew) return; // Stop loading conversation if on New Conversation page
    const conversation = await api.getConversation(params.conversationID);
    if (!conversation) return;
    const messages = await api.getMessages(params.conversationID);
    updateConversation(conversation);
    updateMessages(messages);
  };

  useEffect(
    () => { loadInitialData(); }, // Watch these values for changes (Not DEEP change)
    [params.conversationID] // Update every time the URL param is changed (Sidebar)
  );

  if (!conversation && !isNew) return <span>Loading...</span>;

  return <main className="conversation">
    <AddUserToConvoModal />
    <Sidebar />
    {isNew
      // If creating new convo, display form
      ? <CreateConversation />
      // Otherwise display conversation as normal
      : <>
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
              updateMessages(m => [...m, message]);
            }}
          />
        </footer>
      </>
    }


  </main>;
};
