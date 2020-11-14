import { gql } from '@apollo/client'

export const fetchPosts = gql`
  query Posts {
    posts {
      id
      title
      description
    }
  }
`

export const fetchPost = gql`
  query Post($postId: Int!) {
    post(postId: $postId) {
      id
      title
      description
      totalCommitted
    }
  }
`
