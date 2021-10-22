// const { PrismaClient } = require('.prisma/client');

// const prisma = new PrismaClient()

// const { argsToArgsConfig } = require('graphql/type/definition')
const { users } = require('./database')

const resolvers = {
    User: {
        id: (parent, args, context, info) => parent.id,
        email: (parent) => parent.email,
        firstName: (parent) => parent.firstName,
        lastName: (parent) => parent.lastName
    },
    Query:{
        Users: () => users,
    },
    Mutation: {
        addUser: (_, args) => {
            users.push({
                id: users.length + 1,
                email: args.email,
                firstName: args.firstName,
                lastName: args.lastName
            })
            return users[users.length - 1]
        },
        updateUser: (parent, args) => { 
            user = users.id[parent.id]
            user.firstName = args.firstName; 
            user.lastName = args.lastName; 
            user.email = args.email;
            return user;
           }
    }
}
module.exports = {
    resolvers,
}
