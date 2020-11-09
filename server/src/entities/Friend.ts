import {
  BaseEntity,
  Entity,
  PrimaryColumn
} from 'typeorm'

@Entity()
export class Friend extends BaseEntity {
  @PrimaryColumn()
  userID: number

  @PrimaryColumn()
  friendID: number

}
