import React, { useEffect, useState } from 'react';

import { api } from '../../lib/API';

export const HomePage = () => {

  const [conversation, updateConversation] = useState<any>();

  const loadInitialData = async() => {
    const data = await api.getConversation("c64ef855-e90d-45b8-9cf2-658afb0a4e81");
    updateConversation(data);
  }

  useEffect(
    () => { loadInitialData() }, // Watch these values for changes (Not DEEP change)
    [] // If I pass nothing, it only gets called on component initialization
  );

  return <div>
    <h1>Conversation</h1>
    {conversation && <div>{conversation.name}</div>}
  </div>
}
