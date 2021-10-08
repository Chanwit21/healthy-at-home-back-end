const passport = require('passport');
const router = require('express').Router();
const foodScheduleController = require('../controller/foodSchedule');

router.get(
  '/:day/:relationId',
  passport.authenticate('jwtCustomer', { session: false }),
  foodScheduleController.getFoodScheduleByDay
);
router.post(
  '/',
  passport.authenticate('jwtTrainer', { session: false }),
  foodScheduleController.createFoodScheduleByDay
);

module.exports = router;
