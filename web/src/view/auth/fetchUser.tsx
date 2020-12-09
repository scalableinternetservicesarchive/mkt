import { gql } from '@apollo/client'

export const fetchUser = gql`
  query FetchUserContext {
    self {
      id
      picture
      name
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`
