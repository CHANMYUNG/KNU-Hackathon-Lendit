let express = require('express');
let bodyparser = require('body-parser');
let morgan = require('morgan');

let app = express();


let database = require('./database');
let router = require('./routes');

app.use(morgan('dev'));

app.use(bodyparser.urlencoded({
    extended: false
}));

app.use(bodyparser.json());

app.use('/', router);

app.set('jwt-secret', process.env.LENDIT_JWT_SECRET);
app.set('port', process.env.LENDIT_PORT);

app.listen(app.get('port'), function () {
    console.log('NOW, SERVER IS RUNNING');
    database();
});