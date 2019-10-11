const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.prisma.createUser({ ...args, password });

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user({ email: args.email });
    if (!user) {
        throw new Error('No user exists');
    }

    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
        throw new Error('Invalid Password');
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET);

    return {
        token,
        user,
    };
}

function createLink(parent, args, context, info) {
    const userId = getUserId(context);
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
    });
}

function updateLink(parent, args, context, info) {
    const userId = getUserId(context);
    if (!userId) {
        return new Error('Not Authorized');
    }
    return context.prisma.updateLink({
        data: {
            url: args.url,
            description: args.description,
        },
        where: {
            id: args.id,
        },
    });
}

function deleteLink(parent, args, context, info) {
    const userId = getUserId(context);
    if (!userId) {
        return new Error('Not Authorized');
    }
    return context.prisma.deleteLink({
        id: args.id,
    });
}

module.exports = {
    signup,
    login,
    createLink,
    updateLink,
    deleteLink,
};
