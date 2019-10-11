const { GraphQLServer } = require('graphql-yoga');

const resolvers = {
    Query: {
        info: () => `This is the API for hackernews`,
        feed: (root, args, context, info) => {
            return context.prisma.link();
        },
        // link: (parent, args) =>
        //     links[links.findIndex(item => item.id == args.id)],
    },
    Mutation: {
        createLink: (root, args, context) => {
            return context.prisma.createLink({
                url: args.description,
                description: args.description,
            });
        },
        // updateLink: (parent, args) => {
        //     let index = links.findIndex(item => item.id == args.id);
        //     let link = links[index];
        //     link = {
        //         ...args,
        //     };
        //     links[index] = link;
        //     return link;
        // },
        // deleteLink: (parent, args) => {
        //     let index = links.findIndex(item => item.id == args.id);
        //     let removed = links[index];
        //     let first = links.slice(0, index);
        //     let last = links.slice(index + 1, 0);
        //     links = [...first, ...last];
        //     return removed;
        // },
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
});

server.start(() => console.log(`Server is running on PORT 4000`));
