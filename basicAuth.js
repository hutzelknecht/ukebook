let basic = require('express-authentication-basic');

module.exports = basic(function(challenge, callback) {
    if (challenge.username === 'XXX' && challenge.password === 'XXX') {
        callback(null, true, { user: 'XXX' });
    } else {
        callback(null, false, { error: 'INVALID_PASSWORD' });
    }
});