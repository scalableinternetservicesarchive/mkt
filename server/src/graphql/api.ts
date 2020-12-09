import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import { Redis } from 'ioredis'
import path from 'path'
import { getRepository } from 'typeorm'
import { query } from '../db/sql'
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

async function getUser(redis: Redis, id: number) {
  const key = `user${id}`
  const exists = await redis.exists(key)

  if (exists) {
    const redisResponse = await redis.get(key)
    // console.log(redisResponse)
    return JSON.parse(redisResponse as string) as any
  } else {
    const user = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id_par', { id_par: id })
      .getOne()
    // const user = await User.findOne({ where: { id: id } })
    void redis.set(key, JSON.stringify(user), 'EX', 60)
    return user as any
  }
}

async function getPost(redis: Redis, id: number) {
  const key = `post${id}`
  await redis.del(key)
  const exists = await redis.exists(key)

  if (exists) {
    const redisResponse = await redis.get(key)
    return JSON.parse(redisResponse as string) as any
  } else {
    const post = await Post.createQueryBuilder('post').where('post.id = :id_par', { id_par: id }).getOne()
    void redis.set(key, JSON.stringify(post), 'EX', 60)
    return post
  }
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
    // post: async (_, { postId }) =Response> (await Post.findOne({ where: { id: postId } })) || null,
    post: async (_, { postId }, ctx) => {
      return getPost(ctx.redis, postId)
      // const exists = await ctx.redis.exists('post' + postId)
      // if (exists) {
      //   const redisResponse = await ctx.redis.get('post' + postId)
      //   return JSON.parse(redisResponse as string)
      // } else {
      //   const post = (await Post.findOne({ where: { id: postId } })) || null
      //   void ctx.redis.set('post' + postId, JSON.stringify(post), 'EX', 60)
      //   return post
      // }
    },
    numPosts: async (_, __, ctx) => {
      const exists = await ctx.redis.exists('numPosts')
      if (exists) {
        const redisResponse = await ctx.redis.get('numPosts')
        return parseInt(redisResponse as string)
      } else {
        const query = await Post.createQueryBuilder('post').select('COUNT(*)', 'count').getRawOne()
        const count = parseInt(query['count'])
        console.log(count)
        void ctx.redis.set('numPosts', count, 'EX', 60)
        return count
      }
    },
    posts: async (_, { num, skip, sortKey, sortDir, filterOptions }, ctx) => {
      const page = skip / 10

      // const exists = await ctx.redis.exists('page' + page)

      // if (exists) {
      //   const redisResponse = (await ctx.redis.lrange('page' + page, 0, -1)).map(elem => JSON.parse(elem))

      //   return redisResponse
      // } else {
      // const sort =
      //   sortOptions != null
      //     ? {
      //       [sortOptions.field]: sortOptions.ascending ? "ASC" : "DESC"
      //     }
      //     :
      // let sort = new Map()

      // for some reason orderBy didn't like being given a declared map object?
      // const sortKey_param = sortKey != null
      //   ? sortKey : "post.timeUpdated"
      // const sortDir_param = sortDir != null
      //   ? sortDir ? "ASC" : "DESC"
      //   : "DESC"
      // const sort =
      // {
      //   "post.timeUpdated": "ASC"
      // }
      // const filter =
      //   filterOptions != null
      //     ? `post.ownerId = ${filterOptions.userId}`
      //     : '1=1'
      const posts = await Post.createQueryBuilder()
        // .orderBy(sortKey_param, sortDir_param)
        .select('post')
        .from(Post, 'post')
        // .where(filter)
        .skip(skip)
        .limit(num)
        .getMany()
      // const posts = await Post.find({ take: num, skip: skip, ...sort, ...filter })

      if (posts.length != 0) {
        const redisPage = posts.map(post => JSON.stringify(post))

        void ctx.redis.lpush('page' + page, redisPage)
      }

      return posts
      // }
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
      post.fulfilled = 0
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
      user.comments = []
      await user.save()
      return user
    },
    commit: async (_self, { input }, ctx) => {
      const { amount, itemUrl, postId, userId } = input
      // // const commit = new PostCommit()
      // commit.amount = amount
      // commit.itemUrl = itemUrl
      // commit.user = await User.findOneOrFail({ where: { id: userId } })
      // commit.post = await Post.findOneOrFail({ where: { id: postId } })
      // const user = await getRepository(User)
      //   .createQueryBuilder("user")
      //   .where("user.id = userId")
      //   .getOne()
      // const post = await getRepository(Post)
      //   .createQueryBuilder("post")
      //   .where("post.id = postId")
      //   .getOne()
      // maybe check for nulls here?
      // await getConnection()
      //   .createQueryBuilder()
      //   .insert()
      //   .into(PostCommit)
      //   .values([{
      //     amount: amount,
      //     itemUrl: itemUrl,
      //     postId: postId,
      //     userId: userId,
      //     // post: post,
      //     // user: user
      //   }])
      // .execute()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const commit = new PostCommit()
      commit.amount = amount
      commit.itemUrl = itemUrl
      const [user, post] = await Promise.all([getUser(ctx.redis, userId), getPost(ctx.redis, postId)])
      commit.user = user
      commit.post = post
      await query(
        `INSERT INTO \`post_commit\` (\`amount\`, \`itemUrl\`, \`postId\`, \`userId\`) VALUES (${amount}, '${itemUrl}', ${postId}, ${userId})`
      )
      void ctx.redis.lpush(`post${postId}-commits`, JSON.stringify(commit))
      await query(`UPDATE \`post\` SET fulfilled = ${post.goal + amount} WHERE id = post.id`)
      // commit.user = await getUser(ctx.redis, userId)
      // commit.post = await getPost(ctx.redis, postId)
      // commit.user = await User.findOneOrFail({ where: { id: userId } })
      // commit.post = await Post.findOneOrFail({ where: { id: postId } })
      // void ctx.redis.lpush('post' + postId + '-commits', JSON.stringify(commit))
      return true
    },
    comment: async (_self, { input }, ctx) => {
      const { body, postId, userId } = input
      const comment = new Comment()
      comment.body = body
      const [user, post] = await Promise.all([getUser(ctx.redis, userId), getPost(ctx.redis, postId)])
      comment.user = user
      comment.post = post
      await query(`INSERT INTO \`comment\`(\`body\`, \`postId\`, \`userId\`) VALUES ('${body}', ${postId}, ${userId})`)
      void ctx.redis.lpush(`post${postId}-comments`, JSON.stringify(comment))
      // comment.user = await getUser(ctx.redis, userId)
      // comment.post = await getPost(ctx.redis, postId)
      // comment.user = await User.findOneOrFail({ where: { id: userId } })
      // comment.post = await Post.findOneOrFail({ where: { id: postId } })
      return true
    },
  },

  Post: {
    owner: async (self, _, ctx) => {
      return getUser(ctx.redis, self.ownerId)
    },
    commits: async (self, _, ctx) => {
      const exists = false //await ctx.redis.exists('post' + self.id + '-commits')
      if (exists) {
        const redisResponse = (await ctx.redis.lrange('post' + self.id + '-commits', 0, -1)).map(elem =>
          JSON.parse(elem)
        )
        return redisResponse
      } else {
        // const commits = (await PostCommit.find({ where: { postId: (self as any).id } })) as any[]
        const commits = await PostCommit.createQueryBuilder('commit')
          .where('commit.postId = :id', { id: self.id })
          .getMany()
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
        // const comments = (await Comment.find({ where: { postId: self.id } })) as any[]
        const comments = await Comment.createQueryBuilder('comment')
          .where('comment.postId = :id', { id: self.id })
          .getMany()
        if (comments.length != 0) {
          const redisComments = comments.map(comment => JSON.stringify(comment))

          void ctx.redis.lpush('post' + self.id + '-comments', redisComments)
        }

        return comments
      }
    },
  },

  PostCommit: {
    user: async (self, _, ctx) => {
      return getUser(ctx.redis, self.userId)
    },
  },

  Comment: {
    user: async (self, _, ctx) => {
      return getUser(ctx.redis, self.userId)
    },
  },

  User: {
    commits: async (self, _, ctx) => {
      // return PostCommit.find({ where: { userId: (self as any).id } }) as any
      const exists = await ctx.redis.exists('post' + self.id + '-commits')
      if (exists) {
        const redisResponse = (await ctx.redis.lrange('post' + self.id + '-commits', 0, -1)).map(elem =>
          JSON.parse(elem)
        )

        return redisResponse
      } else {
        // const commits = (await PostCommit.find({ where: { userId: self.id } })) as any[]
        const commits = await PostCommit.createQueryBuilder('commit')
          .where('commit.userId = :id', { id: self.id })
          .getMany()
        if (commits.length != 0) {
          const redisCommits = commits.map(commit => JSON.stringify(commit))

          void ctx.redis.lpush('post' + self.id + '-commits', redisCommits)
        }

        return commits
      }
    },
  },
}
