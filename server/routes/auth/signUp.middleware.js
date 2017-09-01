let WUser = require('../../database/models/wUser');
let WAdmin = require('../../database/models/wAdmin');
let User = require('../../database/models/user');
let Admin = require('../../database/models/admin');
let Agency = require('../../database/models/agency');

const mailer = require('nodemailer');


exports.emailCheck = (req, res) => {
    const email = req.params.email;

    User.findOne({
            email
        })
        .then((user) => {
            if (user) throw new Error('conflict');
            return Admin.findOne({
                email
            });
        })
        .then((admin) => {
            if (admin) throw new Error('conflict');
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err.message);
            if (err.message === 'conflict') res.sendStatus(409);
            else res.sendStatus(500);
        })
}

exports.agencyCheck = (req, res) => {
    const agency = req.params.agency;

    Agency.findOne({
            "_id": agency,
            "_admin": null
        })
        .then((agency) => {
            if (!agency) res.sendStatus(409);
            else res.sendStatus(200);
        })
}

exports.userSignUp = (req, res, next) => {
    if (req.params.type !== 'user') return next();

    const email = req.body.email; // email
    const name = req.body.name; // name 
    const password = req.body.password; // password
    const RFIDKey = req.body.RFIDKey;

    let _wUser = {
        '_id': ''
    };
    WUser.remove({
            "email": email
        }).exec()
        .then(() => {
            return WUser.create(name, email, password, RFIDKey);
        })
        .then((wUser) => {
            _wUser = wUser;
            return sendMail(wUser.email, wUser._id, 'user');
        })
        .then(() => {
            res.status(201).json({
                "email": email
            });
        })
        .catch((err) => {
            console.log('rejected');
            WUser.findOneAndRemove({
                "_id": _wUser._id
            }, function (user) {
                console.log(user);
            });

            res.status(400).json({
                "message": err.message
            })

        })

}

exports.adminSignUp = (req, res, next) => {
    if (req.params.type !== 'admin') return next();

    const email = req.body.email; // email
    const password = req.body.password; // password
    const _agency = req.body.agency; // value of agency _id

    let _wAdmin = {
        '_id': ''
    };
    WAdmin.remove({
            "email": email
        }).exec()
        .then(() => {
            return Agency.findById(_agency);
        })
        .then((agency)=>{
            if(!agency) throw new Error('not exist');
            return WAdmin.create(email, password, _agency);
        })
        .then((wAdmin) => {
            _wAdmin = wAdmin;
            return sendMail(wAdmin.email, wAdmin._id, 'admin');
        })
        .then(() => {
            res.status(201).json({
                "email": email
            });
        })
        .catch((err) => {
            console.log('rejected');

            WAdmin.findOneAndRemove({
                "_id": _wAdmin._id
            }, function (user) {
                console.log(user);
            });
            res.status(400).json({
                "message": err.message
            });

        })
}

function sendMail(email, _id, type) {
    return new Promise((resolve, reject) => {
        mailer.createTestAccount((err, account) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            let transporter = mailer.createTransport({
                service: 'Gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.LENDIT_MAIL_USER, // generated ethereal user
                    pass: process.env.LENDIT_MAIL_PASS // generated ethereal password
                }
            });
            let mailContent = '다음 링크를 클릭해주세요</br><a href= "http://' + process.env.LENDIT_DOMAIN + ":" + process.env.LENDIT_PORT + "/verify/email/" + type + "?hash=" + _id + '">이메일 인증하기</a>';

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Lendit" <lendit@knu.com>', // sender address
                to: email, // list of receivers
                subject: '[Lendit] 이메일 인증 메일입니다.', // Subject line
                //text: '다음 링크를 클릭해주세요', // plain text body
                html: mailContent // html body
            };
            console.log(mailOptions.html);
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    reject(error);
                }

                resolve(info);
            });
        })
    })
}