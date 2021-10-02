const { CourseService } = require('../models');
const cloundinaryUploadPromise = require('../util/upload');
const fs = require('fs');
const Customerror = require('../util/error');

exports.getAllCourseService = async (req, res, next) => {
  try {
    const course_services = await CourseService.findAll();
    res.status(200).json({ course_services });
  } catch (err) {
    next(err);
  }
};

exports.createCourseService = async (req, res, next) => {
  try {
    const { image1, image2 } = req.files;
    const { name, title, price, day } = req.body;

    if (
      name === undefined ||
      title === undefined ||
      price === undefined ||
      day === undefined ||
      image1 === undefined ||
      image2 === undefined
    ) {
      throw new Customerror('All is require', 400);
    }

    const result1 = await cloundinaryUploadPromise(image1[0].path);
    const result2 = await cloundinaryUploadPromise(image2[0].path);

    const course_service = await CourseService.create({
      name,
      title,
      price: +price,
      day: +day,
      imageLink1: result1.secure_url,
      imageLink2: result2.secure_url,
    });

    res.status(201).json({ course_service });
  } catch (err) {
    next(err);
  }
};

exports.updateTextCourseService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, title, price, day } = req.body;

    if (name === undefined || title === undefined || price === undefined || day === undefined) {
      throw new Customerror('All is require', 400);
    }

    const [rows] = await CourseService.update(
      {
        name,
        title,
        price: +price,
        day: +day,
      },
      { where: { id: id } }
    );
    if (rows === 0) {
      return res.status(400).json({ message: 'Can not update course service with this id' });
    }

    res.status(200).json({ message: 'Update course service successful' });
  } catch (err) {
    next(err);
  }
};

exports.updateImageCourseService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = req.file;

    if (image === undefined) {
      throw new Customerror(`${image.fieldname} is require`, 400);
    }

    const result = await cloundinaryUploadPromise(image.path);

    const fieldName = 'imageLink' + image.fieldname.split('image')[1];
    console.log(fieldName);

    const objectUpdate = {};
    objectUpdate[fieldName] = result.secure_url;

    const [rows] = await CourseService.update(objectUpdate, { where: { id: id } });

    if (rows === 0) {
      return res.status(400).json({ message: 'Can not update course service with this id' });
    }

    res.status(200).json({ message: 'Update course service successful' });
  } catch (err) {
    next(err);
  }
};

exports.deleteCourseService = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rows = await CourseService.destroy({ where: { id: id } });

    if (rows === 0) {
      return res.status(400).json({ message: 'Can not delete course service with this id' });
    }

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
