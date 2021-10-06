const router = require('express').Router();
const passport = require('passport');
const userTrainerRelationalController = require('../controller/userTrainerRelational');

router.post(
  '/create_user_trainer_relational',
  passport.authenticate('jwtCustomer', { session: false }),
  userTrainerRelationalController.createUserTrainerRelational
);

router.get(
  '/check_user_trainer_relational',
  passport.authenticate('jwtCustomer', { session: false }),
  userTrainerRelationalController.checkHasAlredyUserTrainerRelational
);

module.exports = router;
