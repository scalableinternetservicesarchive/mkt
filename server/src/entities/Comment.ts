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
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Index()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 1000
  })
  body: string

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
