import { AllowNull, Column, DataType, Model, Table, Unique } from 'sequelize-typescript';

@Table({ paranoid: true })
export class User extends Model<User> {
  @Column({
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    type: DataType.UUID
  })
  id: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;
}
