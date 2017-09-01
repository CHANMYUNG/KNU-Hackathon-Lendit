const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const Open = Schema({
    _hole: { type: Schema.Types.ObjectId, ref : 'hole' },
    openAt: { type : String, required: true },
    closeAt: { type : String, required: true },
    createdAt: { type : String, required: true }
}, { collection : 'Open'});

Open.statics.create = function (_hole, openAt, closeAt) {
    const date = new Date();

    const createdAt = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    const open = new this({
        _hole,
        openAt,
        closeAt,
        createdAt
    })
    return open.save();
}

module.exports = mongoose.model('Open', Open);