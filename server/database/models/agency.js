const mongoose = require('mongoose');
const secret = process.env.LENDIT_JWT_SECRET;

let Schema = mongoose.Schema;

const Agency = Schema({
    name : { type: String, required: true, unique: true },
    _admin: { type: Schema.Types.ObjectId, ref: 'Admin', unique: true },
    holes: [{ type: JSON, default : null }],
    createdAt : { type: String, required: true },
    area: { type: String, required: true }
}, { collection : 'Agency'});


module.exports = mongoose.model('Agency', Agency);