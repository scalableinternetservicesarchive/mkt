import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { Category, Post as GraphqlPost } from '../graphql/schema.types'
import { Comment } from './Comment'
import { PostCommit } from './PostCommit'
import { User } from './User'

@Entity()
export class Post extends BaseEntity implements GraphqlPost {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
    type: 'char',
  })
  title: string

  @Column({
    type: 'text',
  })
  description: string

  // Would also be split into separate entity if filtering added
  @Column({
    length: 100,
    type: 'char',
  })
  merchant: string

  @Column({
    unsigned: true,
  })
  goal: number

  @Column({
    type: 'enum',
    enum: Category,
    default: Category.Housewares,
  })
  category: Category

  @Column()
  ownerId: number

  @ManyToOne(() => User, user => user.posts)
  owner: User

  @OneToMany(() => PostCommit, commit => commit.post)
  commits: PostCommit[]

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[]

}
