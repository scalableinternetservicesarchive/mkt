import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Post } from './Post'
import { User } from './User'

@Entity()
// @Index(['postId', 'userId'], { unique: true })
export class PostCommit extends BaseEntity {
  @PrimaryGeneratedColumn()
  // @Index({ unique: true })
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
  @Index()
  postId: number

  @ManyToOne(() => Post, post => post.commits, {
    cascade: true,
  })
  post: Post

  @Column()
  @Index()
  userId: number

  @ManyToOne(() => User, user => user.commits, {
    cascade: true,
  })
  user: User
}
