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

exports.updateColorExercisePostureById = async (req, res, next) => {
  const { id } = req.params;
  const { title, repSet, breakPeriod } = req.body;
  if ([title, repSet, breakPeriod].includes(undefined)) {
    return res.status(400).json({ message: 'All field is require.' });
  }
  try {
    const [rows] = await ColorExercisePostureInformation.update(
      {
        title,
        repSet,
        breakPeriod,
      },
      { where: { id: id } }
    );

    if (rows === 0) {
      return res.status(400).json({ message: 'Can not update with this id.' });
    }

    res.status(200).json({ message: 'Update success!!' });
  } catch (err) {
    next(err);
  }
};

exports.deleteColorExercisePostureById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const rows = await ColorExercisePostureInformation.destroy({ where: { id: id } });

    if (rows === 0) {
      return res.status(400).json({ message: 'Can not delete with this id.' });
    }

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
