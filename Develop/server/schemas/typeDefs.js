
const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        savedBooks: [Book]
        bookCount: Int
    }

    type Book {
        authors: [String]
        description: String!
        bookId: String!
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput!): User
        deleteBook(bookId: ID!): User
    }

    input BookInput {
        authors: [String]
        description: String!
        title: String!
        bookId: ID!
        image: String
        link: String
    }
`

module.exports = typeDefs