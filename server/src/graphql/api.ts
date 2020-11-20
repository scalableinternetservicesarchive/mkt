import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
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
    posts: () => Post.find(),
  },

  Post: {
    owner: async (self, _, __) => {
      return User.findOne({ where: { id: (self as any).ownerId } }) as any
    },
    commits: async (self, _, __) => {
      return PostCommit.find({ where: { postId: (self as any).id } }) as any
    },
  },

  PostCommit: {
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
