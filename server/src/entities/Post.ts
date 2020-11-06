import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100
  })
  title: string

  @Column({
    length: 288
  })
  description: string

  @ManyToOne(() => User, user => user.posts)
  owner: User

  @ManyToMany(() => User, user => user.memberPosts)
  @JoinTable
  members: User[]
}
