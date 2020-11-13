import { gql } from '@apollo/client'

export const fetchPosts = gql`
  query FetchPosts {
    posts {
      title
      description
    }
  }
`
