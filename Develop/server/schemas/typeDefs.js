const { gql } = require('@apollo/server')

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
        bookCount: Int
    }

    type Book {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput): User
        deleteBook(bookId: ID!): User
    }

    input BookInput {
        bookId: ID!
        title: String!
        authors: [String]
        description: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }
`

module.exports = typeDefs