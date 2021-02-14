import gql from "graphql-tag"

export const GET_POSTS = gql`
  query {
    allPosts {
      id
      title
      user {
        name
      }
      createdAt
    }
  }
`

export const Add_POST = gql`
  mutation(
    $title: String!
  ) {
    createPost(
      title: $title
    ) {
        user {
            id
            name
        }
        title
    }
  }
`
