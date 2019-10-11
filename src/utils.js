const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-da-bom';

function getUserId(context) {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
        console.log('Got the Authorization header');
        const token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, APP_SECRET);
        console.log('Verified user: ', userId);
        return userId;
    }
    throw new Error('Not authenticated');
}

module.exports = {
    getUserId,
    APP_SECRET,
};
