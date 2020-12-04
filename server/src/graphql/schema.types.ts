import { GraphQLResolveInfo } from 'graphql'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export interface Query {
  __typename?: 'Query'
  self?: Maybe<User>
  post?: Maybe<Post>
  posts: Array<Post>
}

export interface QueryPostArgs {
  postId: Scalars['Int']
}

export interface Mutation {
  __typename?: 'Mutation'
  createPost?: Maybe<Post>
  commit: Scalars['Boolean']
}

export interface MutationCreatePostArgs {
  input: CreatePostInput
}

export interface MutationCommitArgs {
  input: CommitInput
}

export interface CreatePostInput {
  title: Scalars['String']
  description: Scalars['String']
  goal: Scalars['Int']
  ownerId: Scalars['Int']
  merchant: Scalars['String']
  initialContribution: Scalars['Int']
  category?: Maybe<Category>
}

export interface CommitInput {
  amount: Scalars['Int']
  postId: Scalars['Int']
  userId: Scalars['Int']
}

export interface Post {
  __typename?: 'Post'
  id: Scalars['Int']
  title: Scalars['String']
  description: Scalars['String']
  goal: Scalars['Int']
  ownerId: Scalars['Int']
  owner: User
  commits: Array<PostCommit>
  category: Category
  merchant: Scalars['String']
}

export interface User {
  __typename?: 'User'
  id: Scalars['Int']
  email: Scalars['String']
  name: Scalars['String']
  posts: Array<Post>
  commits: Array<PostCommit>
  userType: UserType
}

export interface PostCommit {
  __typename?: 'PostCommit'
  id: Scalars['Int']
  amount: Scalars['Int']
  postId: Scalars['Int']
  post: Post
  userId: Scalars['Int']
  user: User
}

export enum UserType {
  Admin = 'ADMIN',
  User = 'USER',
}

export enum Category {
  Clothing = 'CLOTHING',
  Groceries = 'GROCERIES',
  Food = 'FOOD',
  Housewares = 'HOUSEWARES',
  Alcohol = 'ALCOHOL',
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type StitchingResolver<TResult, TParent, TContext, TArgs> =
  | LegacyStitchingResolver<TResult, TParent, TContext, TArgs>
  | NewStitchingResolver<TResult, TParent, TContext, TArgs>
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  CreatePostInput: CreatePostInput
  String: ResolverTypeWrapper<Scalars['String']>
  CommitInput: CommitInput
  Post: ResolverTypeWrapper<Post>
  User: ResolverTypeWrapper<User>
  PostCommit: ResolverTypeWrapper<PostCommit>
  UserType: UserType
  Category: Category
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Int: Scalars['Int']
  Mutation: {}
  Boolean: Scalars['Boolean']
  CreatePostInput: CreatePostInput
  String: Scalars['String']
  CommitInput: CommitInput
  Post: Post
  User: User
  PostCommit: PostCommit
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  self?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'postId'>>
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createPost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreatePostArgs, 'input'>
  >
  commit?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCommitArgs, 'input'>>
}

export type PostResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  goal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  ownerId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  commits?: Resolver<Array<ResolversTypes['PostCommit']>, ParentType, ContextType>
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>
  merchant?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>
  commits?: Resolver<Array<ResolversTypes['PostCommit']>, ParentType, ContextType>
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type PostCommitResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['PostCommit'] = ResolversParentTypes['PostCommit']
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  postId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>
  __isTypeOf?: IsTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Post?: PostResolvers<ContextType>
  User?: UserResolvers<ContextType>
  PostCommit?: PostCommitResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
