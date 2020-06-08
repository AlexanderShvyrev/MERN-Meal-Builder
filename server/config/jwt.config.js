const jwt = require('jsonwebtoken'),
    secret = "This is a very secret phrase";

module.exports.secret = secret;
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else if (req.params._id && req.params._id !== payload._id) {
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}