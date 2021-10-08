const { FoodSchedule } = require('../models');

exports.getFoodScheduleByDay = async (req, res, next) => {
  const { day, relationId } = req.params;
  try {
    const foodSchedule = await FoodSchedule.findOne({
      where: { day: day, userTrainerWorkoutScheduleFoodScheduleId: relationId },
    });
    res.status(200).json({ foodSchedule });
  } catch (err) {
    next(err);
  }
};

exports.createFoodScheduleByDay = async (req, res, next) => {
  const { day, relationId, breakfast, brunch, lunch, afternoon, diner, lastnight } = req.body;
  try {
    const foodScheDule = await FoodSchedule.create({
      day: day,
      userTrainerWorkoutScheduleFoodScheduleId: relationId,
      breakfast,
      brunch,
      lunch,
      afternoon,
      diner,
      lastnight,
    });

    if (!foodScheDule) {
      return res.status(400).json({ message: 'Can not get food schedule!!' });
    }
    res.status(200).json({ foodScheDule });
  } catch (err) {
    next(err);
  }
};