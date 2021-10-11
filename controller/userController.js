const { Op } = require('sequelize');
const { User } = require('../models');
const cloundinaryUploadPromise = require('../util/upload');

exports.changeUserRole = async (req, res, next) => {
  const { role, userId } = req.body;
  try {
    if (userId !== req.user.id) {
      const [rows] = await User.update({ role: role }, { where: { id: userId } });
      if (rows === 0) {
        res.status(400).json({ message: 'Can not update user role with this id' });
      } else {
        res.status(200).json({ message: 'Update user role success' });
      }
    } else {
      res.status(400).json({ message: 'Can not change user role of yourself' });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { firstName, lastName, nickName, weight, height, phoneNumber, gender, education } = req.body;
  try {
    if (isNaN(weight)) {
      return res.status(400).json({ message: 'Weight must be a number' });
    }

    if (isNaN(height)) {
      return res.status(400).json({ message: 'Height must be a number' });
    }

    if (phoneNumber.length !== 10) {
      return res.status(400).json({ message: 'Phone number is invalid length' });
    }

    const objectUpdate = {
      firstName,
      lastName,
      weight: +weight || null,
      height: +height || null,
      nickName: nickName || null,
      phoneNumber: phoneNumber || null,
      gender: gender || null,
      education: education || null,
    };

    if (req.file) {
      const result = await cloundinaryUploadPromise(req.file.path);
      objectUpdate.image = result.secure_url;
    } else {
      objectUpdate.image = null;
    }

    const [rows] = await User.update(objectUpdate, { where: { id: req.user.id } });

    if (rows === 0) {
      return res.status(400).json({ message: 'Cannot update profile with this user' });
    }

    res.status(200).json({ message: 'Update profile success' });
  } catch (err) {
    next(err);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    });
    if (user) {
      return res.status(200).json({ user });
    } else {
      res.status(400).json({ message: 'Can not get user with this id.' });
    }
  } catch (err) {
    next(err);
  }
};

exports.getUserInfoByQuery = async (req, res, next) => {
  try {
    const { sort, limit, offset, word } = req.query;

    if (isNaN(limit) || isNaN(offset)) {
      return res.status(400).json({ message: 'offset and limit must be a number!!' });
    }

    if (!['firstName', 'lastName', 'email'].includes(sort)) {
      return res.status(400).json({ message: 'sort is invalid!!' });
    }

    const allUser = await User.findAll();
    const result = await User.findAll({
      attributes: ['firstName', 'lastName', 'email', 'role', 'id'],
      order: [[sort]],
      limit: +limit,
      offset: +offset,
      where: {
        [Op.or]: [
          {
            firstName: {
              [Op.substring]: word,
            },
          },
          {
            lastName: {
              [Op.substring]: word,
            },
          },
          {
            email: {
              [Op.substring]: word,
            },
          },
        ],
      },
    });
    const users = result.filter((item) => item.id !== req.user.id);

    res.status(200).json({ users: users, length: word ? users.length : allUser.length });
  } catch (err) {
    next(err);
  }
};
