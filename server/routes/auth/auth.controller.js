let User = require('../../database/models/user');
let Admin = require('../../database/models/admin');

exports.verifyEmail = (req, res) => {
    const email = req.params.email;

    User.findOneByEmail(email)
        .then((user) => {
            if (user) throw new Error('conflict');
            return Admin.findOneByEmail(email)
        })
        .then((admin) => {
            if (admin) throw new Error('conflict');
            return;
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            if (err === 'conflict') res.sendStatus(409);
            else res.sendStatus(500);
        })
}