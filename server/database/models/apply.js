const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const Apply = Schema({
    _user: { type: Schema.Types.ObjectId,ref: 'User', required : true},
    _hole: { type: Schema.Types.ObjectId, ref: 'Hole',required : true},
    purpose: { type : String, required: true },
    startAt: { type : String, required: true },
    endAt: { type : String, required: true },
    createdAt : { type: String, required: true }
}, { collection : 'Apply'});

Apply.statics.create = function (_user, _hole, purpose, startAt, endAt) {
    const date = new Date();

    const createdAt = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const apply = new this({
        _user,
        _hole,
        purpose,
        startAt,
        endAt,
        createdAt
    })
    return apply.save();
}

module.exports = mongoose.model('Apply', Apply);