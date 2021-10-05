const passport = require('passport');
const router = require('express').Router();
const transactionController = require('../controller/transaction');

router.get('/', passport.authenticate('jwtCustomer', { session: false }), transactionController.getLatestTransaction);

module.exports = router;
