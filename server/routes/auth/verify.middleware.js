let User = require('../../database/models/user');
let Admin = require('../../database/models/admin');
let WUser = require('../../database/models/wUser');
let WAdmin = require('../../database/models/wAdmin');

exports.userVerify = (req, res, next) => {
    if (req.params.type !== 'user') return next();

    const hash = req.query.hash;

    WUser.findOneAndRemove({
            "_id": hash
        }).exec()
        .then((wUser) => {
            console.log(wUser);
            if (!wUser) throw new Error('404');
            return User.create(wUser.name, wUser.email, wUser.password)
        })
        .then((user) => {
            res.status(201).end("<script>alert('인증 완료되었습니다. 로그인해주세요.')</script>");
        })
        .catch((err) => {
            console.log(err);
            if (err.message === '404') {
                res.writeHead(404, {
                    'content-type': 'text/html;charset=utf8'
                });
                res.write('<div style="font-size:25px">유효하지 않은 링크입니다.</div>');
            } else {
                res.writeHead(500, {
                    'content-type': 'text/html;charset=utf8'
                });
                res.write('<div style="font-size:25px">서버 오류입니다.</div>');
            }
        })
}

exports.adminVerify = (req, res, next) => {
    if (req.params.type !== 'admin') return next();

    const hash = req.query.hash;

    WAdmin.findOneAndRemove({
            "_id": hash
        }).exec()
        .then((wAdmin) => {
            if (!wAdmin) throw new Error('404');
            return Admin.create(wAdmin.email, wAdmin.password, wAdmin._agency)
        })
        .then((admin) => {
            res.status(201).end("<script>alert('인증 완료되었습니다. 로그인해주세요.')</script>");
        })
        .catch((err) => {
            if (err.message === '404') {
                res.writeHead(404, {
                    'content-type': 'text/html;charset=utf8'
                });
                res.write('<div style="font-size:25px">유효하지 않은 링크입니다.</div>');
            } else {
                res.writeHead(500, {
                    'content-type': 'text/html;charset=utf8'
                });
                res.write('<div style="font-size:25px">서버 오류입니다.</div>');
            }
        })
}