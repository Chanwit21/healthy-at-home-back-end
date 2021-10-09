const { ExercisePosture } = require('../models');
const { validateYouTubeUrl } = require('../util/validate');

exports.getAllExercisePosture = async (req, res, next) => {
  try {
    const exercisePostures = await ExercisePosture.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
    res.status(200).json({ exercisePostures });
  } catch (err) {
    next(err);
  }
};

exports.getExercisePostureById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const exercisePosture = await ExercisePosture.findOne({
      where: { id: id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!exercisePosture) {
      return res.status(400).json({ message: 'Can not get Exercise Posture with this id.' });
    }
    res.status(200).json({ exercisePosture });
  } catch (err) {
    next(err);
  }
};

exports.createExercisePosture = async (req, res, next) => {
  try {
    const { name, fontColor, backgroundColor, link, type } = req.body;

    if ([name, fontColor, backgroundColor, link, type].includes(undefined)) {
      return res.status(400).json({ message: 'All field is require.' });
    }

    if (!['Full Body', 'Core & Abs', 'Chest', 'Arm', 'Butt', 'Cardio', 'Rest'].includes(type)) {
      return res.status(400).json({ message: 'Type is invalid.' });
    }

    const colorCodeRegx = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;

    if (!colorCodeRegx.test(fontColor)) {
      return res.status(400).json({ message: 'fontColor is invalid.' });
    }

    if (!colorCodeRegx.test(backgroundColor)) {
      return res.status(400).json({ message: 'backgroundColor is invalid.' });
    }

    if (!validateYouTubeUrl(link)) {
      return res.status(400).json({ message: 'link is invalid.' });
    }

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

    if ([name, fontColor, backgroundColor, link, type].includes(undefined)) {
      return res.status(400).json({ message: 'All field is require.' });
    }

    if (!['Full Body', 'Core & Abs', 'Chest', 'Arm', 'Butt', 'Cardio', 'Rest'].includes(type)) {
      return res.status(400).json({ message: 'Type is invalid.' });
    }

    const colorCodeRegx = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;

    if (!colorCodeRegx.test(fontColor)) {
      return res.status(400).json({ message: 'fontColor is invalid.' });
    }

    if (!colorCodeRegx.test(backgroundColor)) {
      return res.status(400).json({ message: 'backgroundColor is invalid.' });
    }

    if (!validateYouTubeUrl(link)) {
      return res.status(400).json({ message: 'link is invalid.' });
    }

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
