let User = require('../../database/models/user');
let Admin = require('../../database/models/admin');

let WUser = require('../../database/models/wUser');
let WAdmin = require('../../database/models/wAdmin');

const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');

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
            res.setStatus(201).end(token);
        })
        .catch((err) => {
            res.setStatus(400).end(err.message);
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
            res.setStatus(201).end(token);
        })
        .catch((err) => {
            res.setStatus(400).end(err.message);
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


exports.userSignUp = (req, res, next) => {
    if (req.params.type !== 'user') next();

    const email = req.body.email; // email
    const name = req.body.name; // name 
    const password = req.body.password; // password

    WUser.create(name, email, password)
        .then((wUser) => {
            return sendMail(wUser.email, wUser._id);
        })
        .then(() => {
            res.setStatus(201).json({
                "email": email
            });
        })
        .catch((err) => {
            res.setStatus(400).json({
                "message": err.message
            })
        })

}

exports.adminSignUp = (req, res, next) => {
    if (req.params.type !== 'admin') next();

    const email = req.body.email; // email
    const password = req.body.password; // password
    const _agency = req.body.agency; // value of agency _id

    WAdmin.create(email, password, _agency)
        .then((wAdmin) => {
            return sendMail(wAdmin.email, wAdmin._id);
        })
        .then(() => {
            res.setStatus(201).json({
                "email": email
            });
        })
        .catch((err) => {
            res.setStatus(400).json({
                "message": err.message
            })
        })
}

function sendMail(email, _id) {
    return new Promise((resolve, reject) => {
        mailer.createTestAccount((err, account) => {
            if (err) reject(err);
            let transporter = nodemailer.createTransport({
                host: process.env.LENDIT_MAIL_HOST,
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.LENDIT_MAIL_USER, // generated ethereal user
                    pass: process.env.LENDIT_MAIL_PASS // generated ethereal password
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Lendit" <lendit@knu.com>', // sender address
                to: email, // list of receivers
                subject: '[Lendit] 이메일 인증 메일입니다.', // Subject line
                text: '다음 링크를 클릭해주세요', // plain text body
                html: `<a href= "${process.env.LENDIT_DOMAIN}/verify/email/${_id}">이메일 인증하기</a>` // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                }

                resolve(info);
            });
        })
    })
}