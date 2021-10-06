const passport = require('passport');
const router = require('express').Router();
const inprogressProgramController = require('../controller/inprogressProgram');

router.get(
  '/current_program',
  passport.authenticate('jwtCustomer', { session: false }),
  inprogressProgramController.getCurrentProgram
);

module.exports = router;
