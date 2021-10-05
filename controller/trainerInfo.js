const { User } = require('../models');

exports.getAllTrainerInfo = async (req, res, next) => {
  try {
    const trainers = await User.findAll({
      where: { role: 'TRAINER' },
      attributes: ['id', 'role', 'firstName', 'lastName', 'nickName', 'image'],
    });
    res.status(200).json({ trainers });
  } catch (err) {
    next(err);
  }
};
