const passport = require('passport');
const router = require('express').Router();
const transactionController = require('../controller/transaction');

router.get('/', passport.authenticate('jwtCustomer', { session: false }), transactionController.getLatestTransaction);
router.get(
  '/search',
  passport.authenticate('jwtAdmin', { session: false }),
  transactionController.getTransactionByQuery
);
router.get(
  '/all_amount',
  passport.authenticate('jwtAdmin', { session: false }),
  transactionController.getTransactionAllAmount
);

module.exports = router;
