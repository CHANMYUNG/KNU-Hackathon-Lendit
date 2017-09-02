let express = require('express');
let bodyparser = require('body-parser');
let morgan = require('morgan');
let cors = require('cors');
let app = express();



let database = require('./database');
let router = require('./routes');

app.use(cors())

app.use(morgan('dev'));

app.use(bodyparser.urlencoded({
    extended: false
}));

app.use(bodyparser.json());

app.use('/', router);

app.set('jwt-secret', 'zxmkjuinnhnkrngcniun128');
app.set('port', 8080);
app.set('')
app.listen(app.get('port'), function () {
    console.log('NOW, SERVER IS RUNNING');
    database();
});