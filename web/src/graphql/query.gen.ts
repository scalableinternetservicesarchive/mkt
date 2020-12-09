/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FetchUserContext
// ====================================================

export interface FetchUserContext_self {
  __typename: "User";
  id: number;
  picture: string | null;
  name: string;
}

export interface FetchUserContext {
  self: FetchUserContext_self | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateUser
// ====================================================

export interface CreateUser_createUser {
  __typename: "User";
  id: number;
}

export interface CreateUser {
  createUser: CreateUser_createUser | null;
}

export interface CreateUserVariables {
  input: CreateUserInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Posts
// ====================================================

export interface Posts_posts_owner {
  __typename: "User";
  name: string;
  picture: string | null;
}

export interface Posts_posts_commits_user {
  __typename: "User";
  name: string;
  picture: string | null;
}

export interface Posts_posts_commits {
  __typename: "PostCommit";
  amount: number;
  user: Posts_posts_commits_user;
}

export interface Posts_posts_comments_user {
  __typename: "User";
  name: string;
  picture: string | null;
}

export interface Posts_posts_comments {
  __typename: "Comment";
  body: string;
  user: Posts_posts_comments_user;
}

export interface Posts_posts {
  __typename: "Post";
  id: number;
  picture: string | null;
  title: string;
  description: string;
  goal: number;
  owner: Posts_posts_owner;
  commits: Posts_posts_commits[];
  comments: Posts_posts_comments[];
}

export interface Posts {
  posts: Posts_posts[];
}

export interface PostsVariables {
  num: number;
  skip: number;
  sort?: SortOptions | null;
  filter?: UserFilterOptions | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Post
// ====================================================

export interface Post_post_owner {
  __typename: "User";
  id: number;
  name: string;
  picture: string | null;
}

export interface Post_post_commits_user {
  __typename: "User";
  name: string;
  picture: string | null;
}

export interface Post_post_commits {
  __typename: "PostCommit";
  itemUrl: string;
  amount: number;
  user: Post_post_commits_user;
}

export interface Post_post_comments_user {
  __typename: "User";
  name: string;
  picture: string | null;
}

export interface Post_post_comments {
  __typename: "Comment";
  body: string;
  user: Post_post_comments_user;
}

export interface Post_post {
  __typename: "Post";
  id: number;
  picture: string | null;
  title: string;
  description: string;
  goal: number;
  owner: Post_post_owner;
  commits: Post_post_commits[];
  comments: Post_post_comments[];
}

export interface Post {
  post: Post_post | null;
}

export interface PostVariables {
  postId: number;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePost
// ====================================================

export interface CreatePost_createPost {
  __typename: "Post";
  id: number;
}

export interface CreatePost {
  createPost: CreatePost_createPost | null;
}

export interface CreatePostVariables {
  input: CreatePostInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Commit
// ====================================================

export interface Commit {
  commit: boolean;
}

export interface CommitVariables {
  input: CommitInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Comment
// ====================================================

export interface Comment {
  comment: boolean;
}

export interface CommentVariables {
  input: CommentInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Category {
  ALCOHOL = "ALCOHOL",
  CLOTHING = "CLOTHING",
  FOOD = "FOOD",
  GROCERIES = "GROCERIES",
  HOUSEWARES = "HOUSEWARES",
}

export interface CommentInput {
  body: string;
  postId: number;
  userId: number;
}

export interface CommitInput {
  amount: number;
  itemUrl: string;
  postId: number;
  userId: number;
}

export interface CreatePostInput {
  title: string;
  picture?: string | null;
  description: string;
  goal: number;
  ownerId: number;
  merchant: string;
  category?: Category | null;
}

export interface CreateUserInput {
  name: string;
  email: string;
  picture?: string | null;
}

export interface SortOptions {
  field: string;
  ascending: boolean;
}

export interface UserFilterOptions {
  userId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
