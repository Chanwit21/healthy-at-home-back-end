const passport = require('passport');
const router = require('express').Router();
const customerInprogressController = require('../controller/customerInprogress');

router.get('/', passport.authenticate('jwtTrainer', { session: false }), customerInprogressController.getAllCustomer);

module.exports = router;
