const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const Subscription = require('./resolvers/Subscription');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');
const Vote = require('./resolvers/Vote');

const resolvers = {
    Subscription,
    Query,
    Mutation,
    Link,
    User,
    Vote,
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
        };
    },
});

server.start(() => console.log(`Server is running on PORT 4000`));
