const mongoose = require('mongoose');
const secret = 'zxmkjuinnhnkrngcniun128';

const crypto = require('crypto');
let Schema = mongoose.Schema;

const WAdmin = Schema({
    email : { type: String, required: true },
    password : { type: String, required: true },
    createdAt : { type: String, required: true },
    _agency : { type: Schema.Types.ObjectId, ref : 'Agency', required: true }
}, { collection : 'WAdmin'});

// create new account
WAdmin.statics.create = function (email, password, _agency) {
    this.remove({ email });
    const encrypted = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');

    const date = new Date();

    const createdAt = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const wAdmin = new this({
        email,
        "password": encrypted,
        _agency,
        createdAt
    })
    return wAdmin.save();
}

WAdmin.statics.findById = function (_id) {
    return this.findById(_id, { "email": 1, "password": 1, "_agency": 1 }).exec();
}
module.exports = mongoose.model('WAdmin', WAdmin);