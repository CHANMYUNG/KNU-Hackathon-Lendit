let router = require('express').Router();
let signInMiddleware = require('./signIn.middleware');
let signUpMiddleware = require('./signUp.middleware');
let verifyMiddleware = require('./verify.middleware');

router.route('/verify/email/:type').get(verifyMiddleware.userVerify, verifyMiddleware.adminVerify, (req, res) => {
    res.sendStatus(400);
});

router.route('/signin/:type').post(signInMiddleware.userSignIn, signInMiddleware.adminSignIn, (req, res) => {
    res.sendStatus(400);
})

router.route('/signup/:type').post(signUpMiddleware.userSignUp, signUpMiddleware.adminSignUp, (req, res) => {
    res.sendStatus(404);
});

router.route('/check/email/:email').get(signUpMiddleware.emailCheck);

router.route('/check/agency/:agency').get(signUpMiddleware.agencyCheck);

module.exports = router;