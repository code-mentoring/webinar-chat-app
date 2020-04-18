// It is possible to import these from the API (out of scope)

export interface Conversation {
  name: string;
  id: string;
}


export interface Message {
  /** This is the message content */
  content: string;
  id: string;
  conversationId: string;
}


export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
