const { Image } = require('../models');
const cloundinaryUploadPromise = require('../util/upload');

exports.getAllImage = async (req, res, next) => {
  try {
    const customer_result_images = await Image.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { imageType: 'result' },
    });
    res.status(200).json({ customer_result_images });
  } catch (err) {
    next(err);
  }
};

exports.createImage = async (req, res, next) => {
  try {
    const result = await cloundinaryUploadPromise(req.file.path);
    const customer_result_image = await Image.create({
      imageLink: result.secure_url,
      imageType: 'result',
    });
    res.status(201).json({ customer_result_image });
  } catch (err) {
    next(err);
  }
};

exports.deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Image.destroy({ where: { id: id, imageType: 'result' } });
    if (rows === 0) {
      return res.status(400).json({ message: 'Can not delete customer result image with this id' });
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
