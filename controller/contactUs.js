const { ContactUs } = require('../models');
const { isEmail } = require('validator');

exports.getAllContactUs = async (req, res, next) => {
  try {
    const all_contact_us = await ContactUs.findAll();
    res.status(200).json({ all_contact_us });
  } catch (err) {
    next(err);
  }
};

exports.getContactUsByQuery = async (req, res, next) => {
  try {
    const { sort, limit, offset } = req.query;

    if (isNaN(limit) || isNaN(offset)) {
      return res.status(400).json({ message: 'offset and limit must be a number!!' });
    }

    if (!['firstName', 'lastName', 'email', 'createdAt'].includes(sort)) {
      return res.status(400).json({ message: 'sort is invalid!!' });
    }

    const DESC = sort === 'createdAt' ? 'DESC' : 'ASC';

    const allContactUs = await ContactUs.findAll();
    const contactUs = await ContactUs.findAll({ order: [[sort, DESC]], limit: +limit, offset: +offset });

    res.status(200).json({ contactUs, length: allContactUs.length });
  } catch (err) {
    next(err);
  }
};

exports.createContactUs = async (req, res, next) => {
  const { firstName, lastName, email, additionalDetail } = req.body;

  if ([firstName, lastName, email, additionalDetail].includes(undefined)) {
    return res.status(400).json({ message: 'All field is require.' });
  }

  if (typeof firstName !== 'string' || typeof lastName !== 'string') {
    return res.status(400).json({ message: 'firstName or lastName is invalid.' });
  }

  if (!isEmail(email)) {
    return res.status(400).json({ message: 'Email is invalid.' });
  }

  try {
    const contact_us = await ContactUs.create({ firstName, lastName, email, additionalDetail });
    res.status(201).json({ contact_us });
  } catch (err) {
    next(err);
  }
};

exports.deleteContactUs = async (req, res, next) => {
  const { id } = req.params;
  try {
    const rows = await ContactUs.destroy({ where: { id } });
    if (rows === 0) {
      return res.status(400).json({ message: 'Can not delete contact us with this id.' });
    }

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
