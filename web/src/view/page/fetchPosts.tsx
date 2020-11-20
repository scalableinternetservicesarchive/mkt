import { gql } from '@apollo/client'

export const FETCH_POSTS = gql`
  query Posts {
    posts {
      id
      title
      description
    }
  }
`

export const FETCH_POST = gql`
  query Post($postId: Int!) {
    post(postId: $postId) {
      id
      title
      description
      totalCommitted
    }
  }
`

// export const CREATE_POST = gql`
//   mutation CreatePost($title: String!, $description: String!, $totalCommitted: Int!) {
//     createPost(title: $title, description: $description, totalCommitted: $totalCommitted)
//   }
// `
