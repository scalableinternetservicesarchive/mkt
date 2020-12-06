import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { Comment } from '../entities/Comment'
import { Post } from '../entities/Post'
import { PostCommit } from '../entities/PostCommit'
import { User } from '../entities/User'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
  request: Request
  response: Response
  pubsub: PubSub
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    post: async (_, { postId }) => (await Post.findOne({ where: { id: postId } })) || null,
    posts: (_, { num, skip, sortOptions, filterOptions }) => {
      const sort =
        sortOptions != null
          ? {
              order: {
                [sortOptions.field]: sortOptions?.ascending ? 'ASC' : 'DESC',
              },
            }
          : undefined
      const filter =
        filterOptions != null
          ? {
              where: {
                ownerId: filterOptions.userId,
              },
            }
          : undefined
      return Post.find({ take: num, skip: skip, ...sort, ...filter })
    },
    numPosts: async () => await Post.count(),
  },

  Mutation: {
    createPost: async (_self, { input }, _ctx) => {
      const { title, description, goal, merchant, ownerId } = input
      const post = new Post()
      const owner = await User.findOneOrFail({ where: { id: ownerId } })
      post.title = title
      post.description = description
      post.goal = goal
      post.merchant = merchant
      post.commits = []
      post.comments = []
      post.owner = owner
      await post.save()
      return post
    },
    commit: async (_self, { input }, _ctx) => {
      const { amount, itemUrl, postId, userId } = input
      const commit = new PostCommit()
      commit.amount = amount
      commit.itemUrl = itemUrl
      commit.user = await User.findOneOrFail({ where: { id: userId } })
      commit.post = await Post.findOneOrFail({ where: { id: postId } })
      await commit.save()
      return true
    },
    comment: async (_self, { input }, _ctx) => {
      const { body, postId, userId } = input
      const comment = new Comment()
      comment.body = body
      comment.user = await User.findOneOrFail({ where: { id: userId } })
      comment.post = await Post.findOneOrFail({ where: { id: postId } })
      await comment.save()
      return true
    },
  },

  Post: {
    owner: async (self, _, __) => {
      return User.findOne({ where: { id: (self as any).ownerId } }) as any
    },
    commits: async (self, _, __) => {
      return PostCommit.find({ where: { postId: (self as any).id } }) as any
    },
    comments: async (self, _, __) => {
      return Comment.find({ where: { postId: (self as any).id } }) as any
    },
  },

  PostCommit: {
    user: async (self, _, __) => {
      return User.findOne({ where: { id: (self as any).userId } }) as any
    },
  },

  Comment: {
    user: async (self, _, __) => {
      return User.findOne({ where: { id: (self as any).userId } }) as any
    },
  },

  User: {
    commits: async (self, _, __) => {
      return PostCommit.find({ where: { userId: (self as any).id } }) as any
    },
  },
}
