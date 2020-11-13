import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { PostCommit } from './PostCommit'
import { User } from './User'

// not sure if category desired or not?
// Would need to be split into separate entity if used for filtering
export enum Category {
  CLOTHING = 'Clothing',
  GROCERIES = 'Groceries',
  FOOD = 'Food',
  HOUSEWARES = 'Housewares',
  ALCOHOL = 'Alcohol',
}

@Entity()
export class Post extends BaseEntity {
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
  totalCommitted: number

  @Column({
    type: 'enum',
    enum: Category,
    default: Category.HOUSEWARES,
  })
  category: Category

  @ManyToOne(() => User, user => user.posts)
  owner: User

  // @ManyToMany(() => User, user => user.memberPosts, {
  //   eager: false
  // })
  // @JoinTable()
  // members: User[]

  @OneToMany(() => PostCommit, commit => commit, {
    eager: true,
  })
  commits: PostCommit[]
}
