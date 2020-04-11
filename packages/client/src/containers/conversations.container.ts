import { createContainer } from 'unstated-next';
import { useState } from 'react';
import { Conversation } from '../lib/types';
import { api } from '../lib/API';


export const Conversations = createContainer(() => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const loadConversations = async () => {
    const convos = await api.getConversations();
    setConversations(convos);
  };

  const createConversation = async (name: string) => {
    const convo = await api.createConversation(name);
    setConversations(convos => [...convos, convo]);
    return convo;
  };

  return {
    conversations,
    loadConversations,
    createConversation
  };
});
