let User = require('../../database/models/user');

exports.signup = (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    
    User.create(name, email, password)


}

exports.signin = (req, res) => {
    
}