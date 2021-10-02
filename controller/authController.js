const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isEmail, isStrongPassword } = require('validator');

exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (firstName === undefined || lastName === undefined || email === undefined || password === undefined) {
    return res.status(400).json({ message: 'All field is require' });
  }

  if (!isEmail(email)) {
    return res.status(400).json({ message: 'Email is invalid' });
  }

  if (!isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
    return res.status(400).json({ message: 'Password is unsecure' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    res.status(201).json({ message: 'User has been created' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'email or password is incorrect' });
  }

  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (isCorrectPassword) {
        const payload = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
        const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '30d' });
        res.status(200).json({ message: 'Success login', token });
      } else {
        res.status(400).json({ message: 'email or password is incorrect' });
      }
    } else {
      res.status(400).json({ message: 'email or password is incorrect' });
    }
  } catch (err) {
    next(err);
  }
};
