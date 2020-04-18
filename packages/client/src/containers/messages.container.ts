import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';

import { api } from '../lib/API';
import { adminSocket } from '../lib/sockets';
import { Message } from '../lib/types';

/**
 * {
 *  "73cc9924-641b-42c0-b24f-2fd1f9fdc0b3": [
 *    {...message1},
 *    {...message2},
 *  ],
 *  "another-conversation-id": [...]
 * }
 */
interface Messages {
  // Key is the convo id
  [key: string]: Message[];
}

export const Messages = createContainer(() => {

  const [messages, setMessages] = useState<Messages>({});

  const loadMessagesInConvo = async (convoID: string) => {
    const convoMessages = await api.getMessages(convoID);

    setMessages(messages => ({
      ...messages,
      ...{ [convoID]: convoMessages }
    }));
  };

  const addMessageToConvo = (m: Message) => {
    setMessages(messages => {
      const convo = messages[m.conversationId] || [];
      convo.push(m);
      return {...messages, ...{
        [m.conversationId]: convo
      }};
    });
  };

  const createMessage = async (convoID: string, content: string) => {
    const message = await api.createMessage(convoID, content);
    return message;
  };


  useEffect(() => {
    adminSocket.on('message', (m: Message) => {
      addMessageToConvo(m);
    });
  }, []);


  return {
    messages,
    loadMessagesInConvo,
    createMessage
  };
});
