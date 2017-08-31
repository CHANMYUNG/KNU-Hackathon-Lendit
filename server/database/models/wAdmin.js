const mongoose = require('mongoose');
const secret = process.env.LENDIT_JWT_SECRET;

const crypto = require('crypto');
let Schema = mongoose.Schema;

const WAdmin = Schema({
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true },
    createdAt : { type: String, required: true },
    _agency : { type: Schema.Types.ObjectId, ref : 'Agency', required: true, unique: true }
}, { collection : 'WAdmin'});

// create new account
WAdmin.statics.create = function (email, password, _agency) {
    const encrypted = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');

    const date = new Date();

    const createdAt = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const WAdmin = new this({
        email,
        password,
        _agency,
        createdAt
    })
    return WAdmin.save();
}

WAdmin.statics.findOne = function (_id) {
    return this.findOne(_id, { email, password, _agency }).exec();
}
module.exports = mongoose.model('WAdmin', WAdmin);