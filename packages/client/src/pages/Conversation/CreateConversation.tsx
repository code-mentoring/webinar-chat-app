import React, { FormEvent, useRef, useState } from 'react';
import { Redirect } from 'react-router';

import { Conversations } from '../../containers/conversations.container';
import { Conversation } from '../../lib/types';

export const CreateConversation = () => {

  const input = useRef<HTMLInputElement>(null);
  const [convo, setConvo] = useState<Conversation>();

  const { createConversation } = Conversations.useContainer();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const convo = await createConversation(input.current?.value!);
    // Once created we want to redirect to the new conversation
    setConvo(convo);
  };

  if (convo) return <Redirect to={`/c/${convo.id}`} />;

  return <header className="create">
    <form onSubmit={submit}>
      <input
        type="text"
        name="name"
        placeholder="New conversation"
        ref={input}
      />
      <button>Create</button>
    </form>
  </header>;
};
