const { Transaction, User, CourseService, Sequelize } = require('../models');

exports.getLatestTransaction = async (req, res, next) => {
  try {
    const latestTransaction = await Transaction.findAll({
      limit: 1,
      where: {
        userId: req.user.id,
      },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json({ latestTransaction: latestTransaction[0] });
  } catch (err) {
    next(err);
  }
};

exports.getTransactionByQuery = async (req, res, next) => {
  try {
    const { sort, limit, offset } = req.query;

    if (isNaN(limit) || isNaN(offset)) {
      return res.status(400).json({ message: 'offset and limit must be a number!!' });
    }

    if (!['amount', 'status', 'userName'].includes(sort)) {
      return res.status(400).json({ message: 'sort is invalid!!' });
    }
    const sorted = sort === 'userName' ? [{ model: User }, 'firstName'] : [sort];

    const allTransaction = await Transaction.findAll();
    const result = await Transaction.findAll({
      order: [sorted],
      limit: +limit,
      offset: +offset,
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'cardId',
          'sourceId',
          'chargeId',
          'courseServiceId',
          'userId',
          '"expiresAt"',
        ],
      },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
        { model: CourseService, attributes: ['name'] },
      ],
    });
    const transactions = result.map((item) => {
      const {
        id,
        omiseCreatedAt,
        amount,
        status,
        paidAt,
        expiresAt,
        User: { firstName, lastName },
        CourseService: { name },
      } = item;
      return {
        id,
        omiseCreatedAt,
        amount,
        status,
        paidAt,
        expiresAt,
        userName: firstName + ' ' + lastName,
        courseName: name,
      };
    });

    res.status(200).json({ transactions, length: allTransaction.length });
  } catch (err) {
    next(err);
  }
};

exports.getTransactionAllAmount = async (req, res, next) => {
  try {
    const result = await Transaction.findAll({
      attributes: [[Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount']],
      where: { status: 'successful' },
    });
    res.status(200).json({ total_amount: result[0].dataValues.total_amount });
  } catch (err) {
    next(err);
  }
};
