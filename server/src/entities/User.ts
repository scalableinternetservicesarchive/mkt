import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User as GraphqlUser, UserType } from '../graphql/schema.types'
import { Comment } from './Comment'
import { Post } from './Post'
import { PostCommit } from './PostCommit'

@Entity()
export class User extends BaseEntity implements GraphqlUser {
  __typename?: 'User' | undefined
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    type: 'longtext',
    nullable: true,
    default: null,
  })
  picture: string

  @Column({
    length: 100,
    unique: true,
    nullable: false,
    type: 'char',
  })
  email: string

  @Column({
    length: 100,
    nullable: false, // shouldn't be NULL?
    type: 'char',
  })
  name: string

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.User,
  })
  userType: UserType

  @OneToMany(() => Post, post => post.owner)
  posts: Post[]

  @OneToMany(() => PostCommit, commit => commit.user)
  commits: PostCommit[]

  @OneToMany(() => Comment, comment => comment.user)
  comment: Comment[]
}
