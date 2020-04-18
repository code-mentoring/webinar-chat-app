import React, { FormEvent, useRef } from 'react';

import { Messages } from '../../containers/messages.container';


export interface SendMessageProps {
  conversationId: string;
}

export const SendMessage: React.FC<SendMessageProps> = ({
  conversationId
}) => {
  const input = useRef<HTMLInputElement>(null);
  const { createMessage } = Messages.useContainer();

  const submit = async(e: FormEvent) => {
    e.preventDefault();
    await createMessage(conversationId, input.current?.value!);
    input.current!.value = '';
  };

  return <form onSubmit={submit}>
    <input type="text" ref={input} />
  </form>;
};
