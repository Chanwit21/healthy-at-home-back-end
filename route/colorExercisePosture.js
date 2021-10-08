const router = require('express').Router();
const passport = require('passport');
const colorExercisePostureController = require('../controller/colorExercisePosture');

router.get(
  '/',
  passport.authenticate('jwtAlluser', { session: false }),
  colorExercisePostureController.getAllColorExercisePosture
);
router.post(
  '/',
  passport.authenticate('jwtAdmin', { session: false }),
  colorExercisePostureController.createColorExercisePosture
);

module.exports = router;
