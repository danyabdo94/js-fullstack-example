const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        posts: [Post!]!
      }

    type Post {
        id: Int!
        title: String!
        user: User!
    }

    type Query {
        user(id: Int!): User
        allPosts: [Post!]!
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): User!
        createPost(
          userId: Int!
          title: String!
        ): Post!
    }
`

module.exports = typeDefs
