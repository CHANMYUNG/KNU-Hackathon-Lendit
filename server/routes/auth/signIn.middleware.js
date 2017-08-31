let User = require('../../database/models/user');
let Admin = require('../../database/models/admin');

const jwt = require('jsonwebtoken');

exports.userSignIn = (req, res, next) => {
    if (req.params.type !== 'user') next();

    const email = req.body.email;
    const password = req.body.password;

    User.findOneByEmail(email)
        .then((user) => {
            if (!user) next();
            else {
                if (user.verify(password)) resolve(user);
                else next();
            }
        })
        .then(createJWT)
        .then((token) => {
            res.status(201).end(token);
        })
        .catch((err) => {
            res.status(400).end(err.message);
        })
}


exports.adminSignIn = (req, res, next) => {
    if (req.params.type !== 'admin') next();

    const email = req.body.email;
    const password = req.body.password;

    Admin.findOneByEmail(email)
        .then((admin) => {
            if (!admin) next();
            else {
                if (admin.verify(password)) resolve(admin);
                else next();
            }
        })
        .then(createJWT)
        .then((token) => {
            res.status(201).end(token);
        })
        .catch((err) => {
            res.status(400).end(err.message);
        })

}

function createJWT(payload) {
    const p = new Promise((resolve, reject) => {
        jwt.sign(payload,
            secret, {
                expiresIn: '7d',
                issuer: "lendit.com",
                subject: 'userInfo'
            }, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
    })
    return p;
}