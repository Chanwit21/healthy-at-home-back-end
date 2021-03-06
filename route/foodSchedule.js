const passport = require('passport');
const router = require('express').Router();
const foodScheduleController = require('../controller/foodSchedule');

router.get(
  '/:day/:relationId',
  passport.authenticate('jwtCustomerOrTrainer', { session: false }),
  foodScheduleController.getFoodScheduleByDay
);
router.post(
  '/',
  passport.authenticate('jwtTrainer', { session: false }),
  foodScheduleController.createFoodScheduleByDay
);
router.put(
  '/:id',
  passport.authenticate('jwtTrainer', { session: false }),
  foodScheduleController.updateFoodScheduleByDay
);

router.delete(
  '/:id',
  passport.authenticate('jwtTrainer', { session: false }),
  foodScheduleController.deleteFoodScheduleById
);

module.exports = router;
