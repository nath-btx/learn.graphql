const { gql } = require('apollo-server')
// const { users } = require ('./database.js')


const typeDefs = gql`
    type User {
        id: ID!
        email: String
        firstName: String
        lastName: String     
    }    
    type Query {
        Users: [User]
        User(id: ID!): User!
    }
    type Mutation {
            addUser(email: String!, firstName: String!,  lastName: String!): User!
            updateUser(id: ID!,email: String, firstName: String, lastName: String): User!
    }
`

module.exports = {
    typeDefs,
}
