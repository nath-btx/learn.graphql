const { ApolloServer } = require('apollo-server')
// const { gql } = require('apollo-server')

const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

const port = process.env.PORT || 9090

const server = new ApolloServer({
    typeDefs, 
    resolvers
})

server.listen({ port }, () => console.log(`Server runs at: http://localhost:${port}`))