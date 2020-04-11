import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Conversation } from './Conversation';
import { User } from './User';

@Table
export class UserConversation extends Model<UserConversation> {

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @ForeignKey(() => Conversation)
  @Column(DataType.UUID)
  conversationId: string;
}
