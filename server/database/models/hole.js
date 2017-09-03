const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const Hole = Schema({
    name : { type: String, required: true, unique: true },
    explain :{ type : String, required: true },
    hwKey : { type : String, required: true },
    createdAt : { type: String, required: true }
}, { collection : 'Hole'});

Hole.statics.create = function (name, explain, hwKey) {
    const date = new Date();
    
        const createdAt = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
            date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    
        const hole = new this({
            name,
            explain,
            hwKey,
            createdAt
        })
        return hole.save();
}

module.exports = mongoose.model('Hole', Hole);