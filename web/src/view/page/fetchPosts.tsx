import { gql } from '@apollo/client'

export const FETCH_POSTS = gql`
  query Posts($num: Int!, $skip: Int!, $sortKey: String!, $sortDir: Boolean!, $filter: UserFilterOptions) {
    posts(num: $num, skip: $skip, sortKey: $sortKey, sortDir: $sortDir, filterOptions: $filter) {
      id
      picture
      title
      description
      goal
      owner {
        name
        picture
      }
      commits {
        amount
        user {
          name
          picture
        }
      }
      comments {
        body
        user {
          name
          picture
        }
      }
    }
  }
`

export const FETCH_POST = gql`
  query Post($postId: Int!) {
    post(postId: $postId) {
      id
      picture
      title
      description
      goal
      owner {
        id
        name
        picture
      }
      commits {
        itemUrl
        amount
        user {
          name
          picture
        }
      }
      comments {
        body
        user {
          name
          picture
        }
      }
    }
  }
`

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
    }
  }
`

export const COMMIT = gql`
  mutation Commit($input: CommitInput!) {
    commit(input: $input)
  }
`

export const CREATE_COMMENT = gql`
  mutation Comment($input: CommentInput!) {
    comment(input: $input)
  }
`
