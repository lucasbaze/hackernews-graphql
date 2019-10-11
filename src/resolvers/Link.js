function postedBy(parent, args, context, info) {
    console.log(parent);
    return context.prisma.link({ id: parent.id }).postedBy();
}

module.exports = {
    postedBy,
};
