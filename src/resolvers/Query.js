function info(root, args, context, info) {
    return `This is the API for hackernews`;
}

async function feed(root, args, context, info) {
    const where = args.filter
        ? {
              OR: [
                  {
                      description_contains: args.filter,
                      url_contains: args.filter,
                  },
              ],
          }
        : {};

    const links = await context.prisma.links({
        where,
        skip: args.skip,
        first: args.first,
        orderBy: args.orderBy,
    });
    const count = await context.prisma
        .linksConnection({
            where,
        })
        .aggregate()
        .count();

    return { links, count };
}

function link(root, args, context, info) {
    return context.prisma.link({ id: args.id });
}

function users(root, args, context, info) {
    return context.prisma.users();
}

module.exports = {
    info,
    feed,
    link,
    users,
};
