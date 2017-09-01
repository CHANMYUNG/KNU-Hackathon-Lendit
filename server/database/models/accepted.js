const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const Accepted = Schema({
    _user: { type: Schema.Types.ObjectId,ref: 'User', required : true},
    _hole: { type: Schema.Types.ObjectId, ref: 'Hole',required : true},
    startAt: { type : String, required: true },
    endAt: { type : String, required: true },
    createdAt : { type: String, required: true }
}, { collection : 'Accepted'});

Accepted.statics.create = function (_user, _hole, startAt, endAt) {
    const date = new Date();

    const createdAt = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const accepted = new this({
        _user,
        _hole,
        startAt,
        endAt,
        createdAt
    })
    return accepted.save();
}

module.exports = mongoose.model('Accepted', Accepted);