import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Conversation } from './Conversation';
import { User } from './User';

@Table
export class UserConversation extends Model<UserConversation> {

  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Conversation)
  @Column
  conversationId: string;
}
