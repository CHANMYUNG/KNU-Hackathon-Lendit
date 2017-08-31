let WUser = require('../../database/models/wUser');
let WAdmin = require('../../database/models/wAdmin');

const mailer = require('nodemailer');

exports.userSignUp = (req, res, next) => {
    if (req.params.type !== 'user') return next();

    const email = req.body.email; // email
    const name = req.body.name; // name 
    const password = req.body.password; // password

    let _wUser = {
        '_id': ''
    };
    WUser.remove({
            "email": email
        }).exec()
        .then(() => {
            return WUser.create(name, email, password);
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