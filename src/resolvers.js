const { PrismaClient } = require('.prisma/client');

const prisma = new PrismaClient()

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
        // Users: () => users,

        // all users
        Users: () => {
            return prisma.user.findMany()
        },

        // one user
        User: (_parent, args) => {
            return prisma.user.findUnique({
                where: {
                    id: parseInt(args.id),
                }
            })
        },

        // all posts
        Posts: () => {
            return prisma.post.findMany()
        },

        // one post
        Post: (_parent, args) => {
            return prisma.post.findUnique({
                where: {
                    id: parseInt(args.id),
                }
            })
        },

        // all comments
        Comments: (_parent, args) => {
            return prisma.comment.findMany({
                where: {
                    postId: parseInt(args.id),
                }
            })
        },

        // one comment
        Comment: (_parent, args) => {
            return prisma.comment.findUnique({
                where: {
                    id: parseInt(args.id),
                }
            })
        }
    },
    Mutation: {

        // add user
        addUser: (_, args) => {
            return prisma.user.create({
                data: {
                    email: args.data.email,
                    name: args.data.name
                }
            })
        },
        
        // add post
        addPost: (_parent, args) => {
            return prisma.post.create({
                data:{
                    title: args.data.title,
                    body: args.data.body,
                    authorId: args.data.authorId
                }
            })
        },

        // add comment
        addComment: (_parent, args) => {
            return prisma.comment.create({
              data: {
                postId: args.data.postId,
                content: args.data.content,
              },
            })
          },

        // update post
        updatePost: (_parent, args) => {
            console.log(args)
            return prisma.post.update({
            where: {
                id: args.data.id,
            },
            data: {
                title: args.data.title,
                body: args.data.body,
            },
            })
        },

        // delete Post
        deletePost: (_parent, args) => {
            console.log(args.id)
            return prisma.post.delete({
            where: {
                id: parseInt(args.id),
            },
            })
        },

        // update Comment
        updateComment: (_parent, args) => {
            console.log(args)
            return prisma.comment.update({
            where: {
                id: args.data.id,
            },
            data: {
                content:args.data.content
            },
            })
        },

        // delete Comment
        deleteComment: (_parent, args) => {
            console.log(args.id)
            return prisma.comment.delete({
            where: {
                id: parseInt(args.id),
            },
            })
        },
    }
}
module.exports = {
    resolvers,
}
