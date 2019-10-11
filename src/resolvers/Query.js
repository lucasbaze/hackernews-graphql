function info(root, args, context, info) {
    return `This is the API for hackernews`;
}

function feed(root, args, context, info) {
    return context.prisma.links();
}

function link(root, args, context, info) {
    return context.prisma.link({ id: args.id });
}

module.exports = {
    info,
    feed,
    link,
};
