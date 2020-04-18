import './conversation.page.scss';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Messages } from '../../containers/messages.container';
import { api } from '../../lib/API';
import { joinRoom } from '../../lib/sockets';
import { Conversation } from '../../lib/types';
import { AddUserToConvoModal } from '../../modals/AddUserToConvo/AddUserToConvo.modal';
import { CreateConversation } from './CreateConversation';
import { SendMessage } from './SendMessage';


interface Params {
  conversationID: string;
}

export const ConversationPage = () => {
  const params = useParams<Params>();

  const [conversation, updateConversation] = useState<Conversation>();
  const [addingUser, setAddingUser] = useState(false);
  const { messages, loadMessagesInConvo } = Messages.useContainer();

  // Whenever the `params.conversationID` changes, check to see if we are creating new convo
  const isNew = useMemo(
    () => params.conversationID === 'new', // Returns boolean
    [params.conversationID]
  );


  const loadInitialData = async () => {
    if (isNew) return; // Stop loading conversation if on New Conversation page
    const conversation = await api.getConversation(params.conversationID);
    if (!conversation) return;
    loadMessagesInConvo(params.conversationID);
    updateConversation(conversation);
  };

  useEffect(
    () => {
      loadInitialData();
      joinRoom(params.conversationID);
    },
    [params.conversationID]
  );

  const convoMessages = useMemo(
    () => messages[params.conversationID] || [],
    [messages, params.conversationID]
  );

  if (!conversation && !isNew) return <span>Loading...</span>;

  return <main className="conversation">

    {addingUser && <AddUserToConvoModal
      convoID={params.conversationID}
      onClose={() => setAddingUser(false)}
    />}

    <Sidebar />
    {isNew
      // If creating new convo, display form
      ? <CreateConversation />
      // Otherwise display conversation as normal
      : <>
        <header>{conversation
          ? <>
            Conversation {conversation.name}
            <span onClick={() => setAddingUser(true)}> (Add users)</span>
          </>
          : <h1>Could not find conversation</h1>
        }
        </header>
        <ul className="messages">
          {convoMessages.map(m =>
            <li>
              <span>{m.content}</span>
            </li>
          )}
        </ul>

        <footer>
          <SendMessage conversationId={params.conversationID} />
        </footer>
      </>
    }


  </main>;
};
