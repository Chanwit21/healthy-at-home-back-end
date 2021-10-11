const router = require('express').Router();
const exerciseController = require('../controller/exercisePosture');
const passport = require('passport');

router.get(
  '/',
  passport.authenticate('jwtAdminOrTrainer', { session: false }),
  exerciseController.getAllExercisePosture
);
router.get(
  '/search',
  passport.authenticate('jwtAdminOrTrainer', { session: false }),
  exerciseController.getExercisePostureByQuery
);
router.get(
  '/length',
  passport.authenticate('jwtAdminOrTrainer', { session: false }),
  exerciseController.getExercisePostureLength
);
router.get(
  '/:id',
  passport.authenticate('jwtAdminOrTrainer', { session: false }),
  exerciseController.getExercisePostureById
);
router.post(
  '/',
  passport.authenticate('jwtAdminOrTrainer', { session: false }),
  exerciseController.createExercisePosture
);
router.put(
  '/:id',
  passport.authenticate('jwtAdminOrTrainer', { session: false }),
  exerciseController.updateExercisePosture
);
router.delete(
  '/:id',
  passport.authenticate('jwtAdminOrTrainer', { session: false }),
  exerciseController.deleteExercisePosture
);

module.exports = router;
