let User = require('../../database/models/user');
let Admin = require('../../database/models/admin');
let WUser = require('../../database/models/wUser');
let WAdmin = require('../../database/models/wAdmin');

exports.userVerify = (req, res, next) => {
    if (req.params.type !== 'user') next();

    const hash = req.params.email;

    WUser.findOneAndRemove(hash)
        .then((wUser) => {
            if (!wUser) throw new Error('404');
            return User.create(wUser)
        })
        .then((user) => {
            res.status(201).end("<script>alert('인증 완료되었습니다. 로그인해주세요.')</script>");
        })
        .catch((err) => {
            if (err === '404') res.sendStatus(404);
            else res.sendStatus(500);
        })
}

exports.adminVerify = (req, res, next) => {
    if (req.params.type !== 'admin') next();

    const hash = req.params.email;

    WAdmin.findOneAndRemove(hash)
        .then((wAdmin) => {
            if (!wAdmin) throw new Error('404');
            return Admin.create(wAdmin)
        })
        .then((admin) => {
            res.status(201).end("<script>alert('인증 완료되었습니다. 로그인해주세요.')</script>");
        })
        .catch((err) => {
            if (err === '404') res.sendStatus(404);
            else res.sendStatus(500);
        })
}