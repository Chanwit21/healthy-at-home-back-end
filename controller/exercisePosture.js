const { ExercisePosture } = require('../models');

exports.getAllExercisePosture = async (req, res, next) => {
  try {
    const exercisePostures = await ExercisePosture.findAll();
    res.status(200).json({ exercisePostures });
  } catch (err) {
    next(err);
  }
};

exports.getExercisePostureById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exercisePosture = await ExercisePosture.findOne({ where: { id: id } });
    res.status(200).json({ exercisePosture });
  } catch (err) {
    next(err);
  }
};

exports.createExercisePosture = async (req, res, next) => {
  try {
    const { name, fontColor, backgroundColor, link, type } = req.body;
    const exercisePosture = await ExercisePosture.create({
      name,
      fontColor,
      backgroundColor,
      link,
      type,
    });
    res.status(201).json({ exercisePosture });
  } catch (err) {
    next(err);
  }
};

exports.updateExercisePosture = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, fontColor, backgroundColor, link, type } = req.body;
    const [rows] = await ExercisePosture.update(
      { name, fontColor, backgroundColor, link, type },
      { where: { id: id } }
    );
    if (rows === 0) return res.status(400).json({ message: 'Can not update exercise posture where this id' });
    res.status(200).json({ message: 'Successful update' });
  } catch (err) {
    next(err);
  }
};

exports.deleteExercisePosture = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await ExercisePosture.destroy({ where: { id: id } });
    if (rows === 0) return res.status(400).json({ message: 'Can not delete exercise posture where this id' });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
