import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { User as GraphqlUser } from '../graphql/schema.types'
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

  @OneToMany(() => Post, post => post.owner, {
    eager: true,
  })
  posts: Post[]

  @OneToMany(() => PostCommit, commit => commit.user, {
    eager: true,
  })
  commits: PostCommit[]
}
