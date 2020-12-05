import { gql } from '@apollo/client'

export const FETCH_POSTS = gql`
  query Posts($num: Int!, $skip: Int!, $sort: SortOptions, $filter: UserFilterOptions) {
    posts(num: $num, skip: $skip, sortOptions: $sort, filterOptions: $filter) {
      id
      title
      description
      goal
      owner {
        name
      }
      commits {
        amount
        user {
          name
        }
      }
    }
  }
`

export const FETCH_POST = gql`
  query Post($postId: Int!) {
    post(postId: $postId) {
      id
      title
      description
      goal
      owner {
        id
        name
      }
      commits {
        itemUrl
        amount
        user {
          name
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
