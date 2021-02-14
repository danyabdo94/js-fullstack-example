const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        posts: [Post!]!
    }
    
    type AuthPayload {
        token: String!
        user: User!
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
        signup(name: String!, email: String!, password: String!): User!
        login(
            email: String!
            password: String!
        ):AuthPayload!

        createPost(
          userId: Int!
          title: String!
        ): Post!
    }
`

module.exports = typeDefs
