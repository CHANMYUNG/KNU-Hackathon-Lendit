let router = require('express').Router();
let applyController = require('./apply.controller');
const JWTMiddleware = require('../../middlewares/JWTMiddleware');

router.route('/apply/:hole').get(JWTMiddleware.authMiddleware, applyController.getApplies);

router.route('/apply/:hole').post(JWTMiddleware.authMiddleware, applyController.acceptApply);

router.route('/apply').post(JWTMiddleware.authMiddleware, JWTMiddleware.onlyUser, applyController.apply);

router.route('/accept/:apply').get(JWTMiddleware.authMiddleware, JWTMiddleware.onlyAdmin, applyController.acceptApply)

module.exports = router;