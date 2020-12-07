import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import { Redis } from 'ioredis'
import path from 'path'
import { Comment } from '../entities/Comment'
import { Post } from '../entities/Post'
import { PostCommit } from '../entities/PostCommit'
import { User } from '../entities/User'
import { Resolvers, UserType } from './schema.types'

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
  redis: Redis
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    // post: async (_, { postId }) => (await Post.findOne({ where: { id: postId } })) || null,
    post: async (_, { postId }, ctx) => {
      // (await ctx.postLoader.load(postId)) || null,
      const exists = await ctx.redis.exists('post' + postId)
      if (exists) {
        const redisResponse = await ctx.redis.get('post' + postId)
        return JSON.parse(redisResponse as string)
      } else {
        const post = (await Post.findOne({ where: { id: postId } })) || null
        void ctx.redis.set('post' + postId, JSON.stringify(post), 'EX', 60)
        return post
      }
    },
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
    numPosts: async (_, __, ctx) => {
      const exists = await ctx.redis.exists('numPosts')
      if (exists) {
        const redisResponse = await ctx.redis.get('numPosts')
        return parseInt(redisResponse as string)
      } else {
        const count = await Post.count()
        void ctx.redis.set('numPosts', count, 'EX', 60)
        return count
      }
    },
  },

  Mutation: {
    createPost: async (_self, { input }, _ctx) => {
      const { title, description, picture, goal, merchant, ownerId } = input
      const post = new Post()
      const owner = await User.findOneOrFail({ where: { id: ownerId } })
      post.title = title
      if (picture != null) {
        post.picture = picture
      }
      post.description = description
      post.goal = goal
      post.merchant = merchant
      post.commits = []
      post.comments = []
      post.owner = owner
      await post.save()
      return post
    },
    createUser: async (_self, { input }, _ctx) => {
      const { name, email, picture } = input
      const user = new User()
      user.name = name
      user.email = email
      if (picture != null) {
        user.picture = picture
      }
      user.userType = UserType.User
      user.posts = []
      user.commits = []
      user.comment = []
      await user.save()
      return user
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
    owner: async (self, _, ctx) => {
      // return User.findOne({ where: { id: (self as any).ownerId } }) as any
      const exists = await ctx.redis.exists('user' + self.ownerId)

      if (exists) {
        const redisResponse = await ctx.redis.get('user' + self.ownerId)

        return JSON.parse(redisResponse as string) as any
      } else {
        const user = await User.findOne({ where: { id: (self as any).ownerId } })
        void ctx.redis.set('user' + self.ownerId, JSON.stringify(user), 'EX', 60)

        return user as any
      }
    },
    commits: async (self, _, ctx) => {
      const exists = await ctx.redis.exists('post' + self.id + '-commits')
      if (exists) {
        const redisResponse = (await ctx.redis.lrange('post' + self.id + '-commits', 0, -1)).map(elem =>
          JSON.parse(elem)
        )

        return redisResponse
      } else {
        const commits = (await PostCommit.find({ where: { postId: (self as any).id } })) as any[]

        if (commits.length != 0) {
          const redisCommits = commits.map(commit => JSON.stringify(commit))

          void ctx.redis.lpush('post' + self.id + '-commits', redisCommits)
        }

        return commits
      }
    },
    comments: async (self, _, ctx) => {
      // return Comment.find({ where: { postId: (self as any).id } }) as any
      const exists = await ctx.redis.exists('post' + self.id + '-comments')
      if (exists) {
        const redisResponse = (await ctx.redis.lrange('post' + self.id + '-comments', 0, -1)).map(elem =>
          JSON.parse(elem)
        )

        return redisResponse
      } else {
        const comments = (await Comment.find({ where: { postId: (self as any).id } })) as any[]

        if (comments.length != 0) {
          const redisComments = comments.map(comment => JSON.stringify(comment))

          void ctx.redis.lpush('post' + self.id + '-comments', redisComments)
        }

        return comments
      }
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
