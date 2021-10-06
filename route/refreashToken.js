const router = require('express').Router();
const passport = require('passport');
const refreashTokenController = require('../controller/refreashToken');

router.get('/', passport.authenticate('jwtAlluser', { session: false }), refreashTokenController.refreashToken);

module.exports = router;
