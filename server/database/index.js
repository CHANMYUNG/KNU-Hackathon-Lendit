let mongoose = require('mongoose');

module.exports = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/Lendit');
    mongoose.connection.on('error', console.error.bind(console, 'mongoose connection error.'));
    mongoose.connection.on('open', function () {
        console.log('데이터베이스에 연결되었습니다. : ');

    });
    mongoose.connection.on('disconnected', () => {
        console.log('DISCONNECTED TO DATABASE');
    });
};