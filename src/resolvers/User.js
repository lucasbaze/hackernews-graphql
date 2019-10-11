function links(parent, args, context) {
    console.log(parent);
    return context.prisma.user({ id: parent.id }).links();
}

module.exports = {
    links,
};
