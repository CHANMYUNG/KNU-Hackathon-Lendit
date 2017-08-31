let router = require('express').Router();
let controller = require('./auth.controller');
let middleware = require('./auth.middleware');

router.route('/verify/email').get(controller.verifyEmail);

router.route('/signin/:type').post(middleware.userSignIn, middleware.adminSignIn, (req, res) => {
    res.sendStatus(400);
})

router.route('/signup/:type').post(middleware.userSignUp, middleware.adminSignUp, (req, res) => {

});