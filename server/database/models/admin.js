const mongoose = require('mongoose');
const secret = 'zxmkjuinnhnkrngcniun128';

const crypto = require('crypto');
let Schema = mongoose.Schema;

const Admin = Schema({
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true },
    createdAt : { type: String, required: true },
    _agency : { type: Schema.Types.ObjectId, ref : 'Agency', required: true, unique: true }
}, { collection : 'Admin'});

// create new account
Admin.statics.create = function (email, password, _agency) {
    
    const date = new Date();

    const createdAt = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const admin = new this({
        email,
        password,
        _agency,
        createdAt
    })
    return admin.save();
}

// find one admin by email
Admin.statics.findOneByEmail = function (email) {
    return this.findOne({
        email
    }).exec()
}

Admin.statics.findOneBy_agency = function (agency) {
    return this.findOne({
        code
    }, { "email": 1, "_agency": 1 }).exec()
}

// verify user 
Admin.methods.verify = function (password) {
    const encrypted = crypto.createHmac('sha1', secret)
        .update(password)
        .digest('base64');
    return this.password === encrypted;
}

module.exports = mongoose.model('Admin', Admin);