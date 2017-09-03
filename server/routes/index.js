let router = require('express').Router();

router.use('/', require('./auth'));
router.use('/', require('./hole'));
router.use('/', require('./agency'));
router.use('/', require('./apply'));

module.exports = router;