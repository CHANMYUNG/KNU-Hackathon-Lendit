let router = require('express').Router();
const JWTMiddleware = require('../../middlewares/JWTMiddleware');
const holeController = require('./hole.controller');

router.route('/hole').get(JWTMiddleware.authMiddleware, holeController.getHoles)
router.route('/hole').post(JWTMiddleware.authMiddleware, JWTMiddleware.onlyAdmin, holeController.regiterHole);
router.route('/hole').delete(JWTMiddleware.authMiddleware, JWTMiddleware.onlyAdmin, holeController.deleteHole);

router.route('/hole/knu').get(JWTMiddleware.authMiddleware, holeController.getKNUHoles)

router.route('/hole/open').post(JWTMiddleware.authMiddleware, JWTMiddleware.onlyAdmin, holeController.openHole);

module.exports = router;