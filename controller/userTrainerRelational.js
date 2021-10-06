const { User, UserTrainerWorkoutScheduleFoodSchedule } = require('../models');

exports.createUserTrainerRelational = async (req, res, next) => {
  const { loseWeightBefore, desease, dateStart, foodAllergic, typeOfFood, courseServiceId } = req.body;
  const userId = req.user.id;
  const trainers = await User.findAll({ where: { role: 'TRAINER' }, attributes: ['id', 'role'] });
  const randomNumber = Math.floor(Math.random() * (trainers.length + 1));
  const trainerId = trainers[randomNumber].id;
  const userTrainerRelational = await UserTrainerWorkoutScheduleFoodSchedule.create({
    courseServiceId,
    userId,
    trainerId,
    loseWeightBefore,
    desease,
    dateStart,
    foodAllergic,
    typeOfFood,
  });
  res.status(200).json({ userTrainerRelational });
};

exports.checkHasAlredyUserTrainerRelational = async (req, res, next) => {
  try {
    const relation = await UserTrainerWorkoutScheduleFoodSchedule.findOne({ where: { userId: req.user.id } });
    if (!relation) {
      return res.status(200).json({ already: false });
    }
    res.status(200).json({ already: true });
  } catch (err) {
    next(err);
  }
};
