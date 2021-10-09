const { FoodSchedule } = require('../models');

exports.getFoodScheduleByDay = async (req, res, next) => {
  const { day, relationId } = req.params;
  try {
    const foodSchedule = await FoodSchedule.findOne({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
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

exports.updateFoodScheduleByDay = async (req, res, next) => {
  const { id } = req.params;
  const { day, breakfast, brunch, lunch, afternoon, diner, lastnight, userTrainerWorkoutScheduleFoodScheduleId } =
    req.body;
  if (
    [id, day, breakfast, brunch, lunch, afternoon, diner, lastnight, userTrainerWorkoutScheduleFoodScheduleId].includes(
      undefined
    )
  ) {
    return res.status(400).json({ message: 'All field is require !!' });
  }

  try {
    const [rows] = await FoodSchedule.update(
      { breakfast, brunch, lunch, afternoon, diner, lastnight },
      { where: { id, day, userTrainerWorkoutScheduleFoodScheduleId } }
    );

    if (rows === 0) {
      return res.status(400).json({ message: 'Can not update food schedule.' });
    }

    res.status(200).json({ message: 'Food schedule update successful.' });
  } catch (err) {
    next(err);
  }
};
