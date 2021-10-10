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
  passport.authenticate('jwtAdminOrTrainer', { session: false }),
  colorExercisePostureController.createColorExercisePosture
);
router.put(
  '/:id',
  passport.authenticate('jwtAdminOrTrainer', { session: false }),
  colorExercisePostureController.updateColorExercisePostureById
);
router.delete(
  '/:id',
  passport.authenticate('jwtAdminOrTrainer', { session: false }),
  colorExercisePostureController.deleteColorExercisePostureById
);

module.exports = router;
