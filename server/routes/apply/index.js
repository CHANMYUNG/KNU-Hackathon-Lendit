let router = require('express').Router();
let applyController = require('./apply.controller');
const JWTMiddleware = require('../../middlewares/JWTMiddleware');

router.route('/apply/:hole').get(JWTMiddleware.authMiddleware, applyController.getApplies);

module.exports = router;