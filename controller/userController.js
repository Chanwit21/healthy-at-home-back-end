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

    const result = await cloundinaryUploadPromise(req.file.path);

    const [rows] = await User.update(
      {
        firstName,
        lastName,
        nickName,
        weight: +weight,
        height: +height,
        phoneNumber,
        gender,
        image: result.secure_url,
        education,
      },
      { where: { id: req.user.id } }
    );

    if (rows === 0) {
      return res.status(400).json({ message: 'Cannot update profile with this user' });
    }

    res.status(200).json({ message: 'Update profile success' });
  } catch (err) {
    next(err);
  }
};