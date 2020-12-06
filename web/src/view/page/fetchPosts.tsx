import { gql } from '@apollo/client'

export const FETCH_POSTS = gql`
  query Posts($num: Int!, $skip: Int!, $sort: SortOptions, $filter: UserFilterOptions) {
    posts(num: $num, skip: $skip, sortOptions: $sort, filterOptions: $filter) {
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
