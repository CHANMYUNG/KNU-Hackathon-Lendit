const mongoose = require('mongoose');
const secret = process.env.LENDIT_JWT_SECRET;

const crypto = require('crypto');
let Schema = mongoose.Schema;

const User = Schema({
    name : { type: String, required: true },
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true },
    createdAt : { type: String, required: true },
    RFIDKey: { type: String, required: true, unique: true}
}, { collection : 'User'});


// create new account
User.statics.create = function (name, email, password, RFIDKey) {
    const date = new Date();

    const createdAt = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const user = new this({
        email,
        password,
        name,
        createdAt,
        RFIDKey
    })
    return user.save();
}

User.statics.findOneByEmail = function (email) {
    return this.findOne({ email }, { "name": 1, "email": 1, "password": 1 }).exec();
}


// verify user 
User.methods.verify = function (password) {
    const encrypted = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');
    return this.password === encrypted;
}

module.exports = mongoose.model('User', User);