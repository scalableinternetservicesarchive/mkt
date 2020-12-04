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
// GraphQL query operation: Posts
// ====================================================

export interface Posts_posts_owner {
  __typename: "User";
  name: string;
}

export interface Posts_posts_commits_user {
  __typename: "User";
  name: string;
}

export interface Posts_posts_commits {
  __typename: "PostCommit";
  amount: number;
  user: Posts_posts_commits_user;
}

export interface Posts_posts {
  __typename: "Post";
  id: number;
  title: string;
  description: string;
  goal: number;
  owner: Posts_posts_owner;
  commits: Posts_posts_commits[];
}

export interface Posts {
  posts: Posts_posts[];
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
  name: string;
}

export interface Post_post_commits_user {
  __typename: "User";
  name: string;
}

export interface Post_post_commits {
  __typename: "PostCommit";
  amount: number;
  user: Post_post_commits_user;
}

export interface Post_post {
  __typename: "Post";
  id: number;
  title: string;
  description: string;
  goal: number;
  owner: Post_post_owner;
  commits: Post_post_commits[];
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

export interface CommitInput {
  amount: number;
  postId: number;
  userId: number;
}

export interface CreatePostInput {
  title: string;
  description: string;
  goal: number;
  ownerId: number;
  merchant: string;
  initialContribution: number;
  category?: Category | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
