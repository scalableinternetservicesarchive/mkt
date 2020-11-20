import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity()
export class PostCommit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    unsigned: true,
  })
  amount: number

  @ManyToOne(() => Post, post => post.commits, {
    cascade: true,
  })
  post: Post

  @Column()
  userId: number

  @ManyToOne(() => User, user => user.commits, {
    cascade: true,
  })
  user: User
}
