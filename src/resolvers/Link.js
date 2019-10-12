function postedBy(parent, args, context, info) {
    console.log(parent);
    return context.prisma.link({ id: parent.id }).postedBy();
}

function votes(parent, args, context, info) {
    console.log('Parent: ', parent, 'Info: ', info);
    return context.prisma.link({ id: parent.id }).votes();
}

module.exports = {
    postedBy,
    votes,
};
