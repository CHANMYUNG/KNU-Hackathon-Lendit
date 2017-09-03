const mongoose = require('mongoose');
const secret = 'zxmkjuinnhnkrngcniun128';

const crypto = require('crypto');
let Schema = mongoose.Schema;

const WUser = Schema({
    name : { type: String, required: true },
    email : { type: String, required: true },
    password : { type: String, required: true },
    createdAt : { type: String, required: true },
    RFIDKey: { type: String, required: true, unique: true}
}, { collection : 'WUser'});


// create new account
WUser.statics.create = function (name, email, password, RFIDKey) {
    this.remove({ email });
    const encrypted = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');

    const date = new Date();

    const createdAt = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const wUser = new this({
        email,
        "password": encrypted,
        name,
        createdAt,
        RFIDKey
    })
    return wUser.save();
}

WUser.statics.findOneByEmail = function (email) {
    return this.findOne({ email }, { "name": 1, "email": 1 }).exec();
}


WUser.statics.findById = function (_id) {
    return this.findById(_id, { "email": 1, "name": 1, "password": 1 }).exec();
}

module.exports = mongoose.model('WUser', WUser);