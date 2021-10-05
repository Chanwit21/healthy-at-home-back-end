const { Transaction } = require('../models');

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
