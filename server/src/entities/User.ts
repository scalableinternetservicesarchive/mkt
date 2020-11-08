import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User as GraphqlUser } from '../graphql/schema.types'
import { Post } from './Post'

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
  })
  email: string

  @Column({
    length: 100,
    nullable: true,
  })
  name: string

  @OneToMany(() => Post, post => post.owner, { eager: true })
  posts: Post[]

  @ManyToMany(() => Post, post => post.members)
  memberPosts: Post[]
}
