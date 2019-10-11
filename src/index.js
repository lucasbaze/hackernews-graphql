const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
    Query: {
        info: () => `This is the API for hackernews`,
        feed: (root, args, context, info) => {
            return context.prisma.links();
        },
        link: (root, args, context, info) => {
            return context.prisma.link({ id: args.id });
        },
    },
    Mutation: {
        createLink: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            });
        },
        updateLink: (root, args, context) => {
            return context.prisma.updateLink({
                data: {
                    url: args.url,
                    description: args.description,
                },
                where: {
                    id: args.id,
                },
            });
        },
        deleteLink: (root, args, context) => {
            return context.prisma.deleteLink({
                id: args.id,
            });
        },
    },

    //Can be omitted because the schema defines the return data and
    //GraphQL figures it'll return at least the id, url and description off the parent object
    // Link: {
    //     id: parent => parent.id,
    //     url: parent => parent.url,
    //     description: parent => parent.description,
    // },
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma },
});

server.start(() => console.log(`Server is running on PORT 4000`));
