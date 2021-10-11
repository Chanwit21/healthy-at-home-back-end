const { Transaction, User, CourseService } = require('../models');

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

    const allTransaction = await Transaction.findAll();
    const result = await Transaction.findAll({
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
    const transactions = result
      .map((item) => {
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
      })
      .sort((a, b) => {
        if (b[sort] > a[sort]) return -1;
        return 1;
      });

    res.status(200).json({ transactions, length: allTransaction.length });
  } catch (err) {
    next(err);
  }
};
