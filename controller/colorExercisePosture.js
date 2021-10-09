const { ColorExercisePostureInformation } = require('../models');

exports.getAllColorExercisePosture = async (req, res, next) => {
  try {
    const colorExercisePostures = await ColorExercisePostureInformation.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.status(200).json({ colorExercisePostures });
  } catch (err) {
    next(err);
  }
};

exports.createColorExercisePosture = async (req, res, next) => {
  const { backgroundColor, fontColor, repSet, title, breakPeriod } = req.body;
  if ([backgroundColor, fontColor, repSet, title, breakPeriod].includes(undefined)) {
    return res.status(400).json({ message: 'All field is require.' });
  }
  try {
    const colorExercisePosture = await ColorExercisePostureInformation.create({
      backgroundColor,
      fontColor,
      repSet,
      title,
      breakPeriod,
    });
    res.status(201).json({ colorExercisePosture });
  } catch (err) {
    next(err);
  }
};
