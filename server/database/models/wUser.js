const mongoose = require('mongoose');
const secret = process.env.LENDIT_JWT_SECRET;

const crypto = require('crypto');
let Schema = mongoose.Schema;

const WUser = Schema({
    name : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    createdAt : { type: String, required: true }
}, { collection : 'WUser'});


// create new account
WUser.statics.create = function (name, email, password) {
    const encrypted = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');

    const date = new Date();

    const createdAt = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const WUser = new this({
        email,
        password,
        name,
        createdAt
    })
    return WUser.save();
}

WUser.statics.findOneByEmail = function (email) {
    return this.findOne({ email }, {"name": 1, "email": 1}).exec();
}


WUser.statics.findOne = function (_id) {
    return this.findOne(_id, { "email": 1, "name": 1, "password": 1 }).exec();
}

module.exports = mongoose.model('WUser', WUser);