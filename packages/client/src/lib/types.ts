// It is possible to import these from the API (out of scope)

export interface Conversation {
  name: string;
  id: string;
}


export interface Message {
  /** This is the message content */
  content: string;
  id: string;
}
