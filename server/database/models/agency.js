const mongoose = require('mongoose');
const secret = 'zxmkjuinnhnkrngcniun128';

let Schema = mongoose.Schema;

const Agency = Schema({
    name : { type: String, required: true, unique: true },
    _admin: { type: Schema.Types.ObjectId, ref: 'Admin', default: null },
    holes: [{ type: Schema.Types.ObjectId, ref: 'Hole', default : null }],
    createdAt : { type: String, required: true },
    state: { type: String, default: null },
    area: { type: String, required: true }
}, { collection : 'Agency'});


module.exports = mongoose.model('Agency', Agency);