const router = require('express').Router();
const passport = require('passport');
const workoutScheduleController = require('../controller/workoutSchedule');

router.get(
  '/all/:reletionId',
  passport.authenticate('jwtCustomer', { session: false }),
  workoutScheduleController.getAllWorkoutSchedule
);
router.get(
  '/:day/:reletionId',
  passport.authenticate('jwtTrainer', { session: false }),
  workoutScheduleController.getWorkoutScheduleByDay
);
router.post(
  '/',
  passport.authenticate('jwtTrainer', { session: false }),
  workoutScheduleController.createWorkoutScheduleByDay
);
router.put(
  '/',
  passport.authenticate('jwtTrainer', { session: false }),
  workoutScheduleController.editWorkoutScheduleByColAndworkoutScheduleId
);
router.delete(
  '/:id',
  passport.authenticate('jwtTrainer', { session: false }),
  workoutScheduleController.deleteWorkoutScheduleById
);

module.exports = router;
