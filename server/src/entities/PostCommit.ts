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
    type: 'text',
  })
  itemUrl: string

  @Column({
    unsigned: true,
  })
  amount: number

  @Column()
  postId: number

  @ManyToOne(() => Post, post => post.commits, {
    cascade: false,
  })
  post: Post

  @Column()
  userId: number

  @ManyToOne(() => User, user => user.commits, {
    cascade: false,
  })
  user: User
}
