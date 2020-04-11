import { AllowNull, BelongsTo, Column, DataType, Model, Table, ForeignKey } from 'sequelize-typescript';

import { User } from './User';
import { Conversation } from './Conversation';

@Table({ paranoid: true })
export class Message extends Model<Message> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID
  })
  id: string;

  @AllowNull(false)
  @Column
  content: string;

  // This is the column of the conversation ID itself
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string; // Who sent the message

  // This is just for Sequelize to create a one to one relationship
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Conversation)
  @Column(DataType.UUID)
  conversationId: string;
}
