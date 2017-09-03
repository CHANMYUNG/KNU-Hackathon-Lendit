let router = require('express').Router();
let agencyController = require('./agency.controller');
const JWTMiddleware = require('../../middlewares/JWTMiddleware');

router.route('/agency').get(JWTMiddleware.authMiddleware, agencyController.getAgencies);

module.exports = router;