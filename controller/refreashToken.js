const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.refreashToken = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ where: { id: userId } });
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      image: user.image,
    };
    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: process.env.TOKEN_EXPIRE });
    res.status(200).json({ message: 'Success refresh token', token });
  } catch (err) {
    next(err);
  }
};
