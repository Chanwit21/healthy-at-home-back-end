const { Image } = require('../models');
const cloundinaryUploadPromise = require('../util/upload');

exports.getFoodImageByQuery = async (req, res, next) => {
  const { type } = req.query;
  if (['food_menu_postworkout', 'food_menu_normal', 'food_menu_snack', 'food_menu_preworkout'].includes(type)) {
    const images = await Image.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { imageType: type },
    });
    res.status(200).json({ images });
  } else {
    res.status(400).json({ message: 'Type is not found.' });
  }
};

exports.createImage = async (req, res, next) => {
  try {
    const { type } = req.body;
    const result = await cloundinaryUploadPromise(req.file.path);
    const food_image = await Image.create({
      imageLink: result.secure_url,
      imageType: type,
    });
    res.status(201).json({ food_image });
  } catch (err) {
    next(err);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const { type } = req.body;
    const { id } = req.params;
    const rows = await Image.destroy({ where: { id: id, imageType: type } });
    if (rows === 0) {
      return res.status(400).json({ message: 'Can not delete food image with this id' });
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
