import gql from "graphql-tag"

export const SIGNUP = gql`
  mutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(
        email: $email
        name: $name
        password: $password
    ) {
        id
    }
  }
`
