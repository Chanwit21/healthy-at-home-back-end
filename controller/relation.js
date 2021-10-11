const { UserTrainerWorkoutScheduleFoodSchedule, User } = require('../models');

exports.getRelationByQuery = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;

    if (isNaN(limit) || isNaN(offset)) {
      return res.status(400).json({ message: 'offset and limit must be a number!!' });
    }

    const allTransaction = await UserTrainerWorkoutScheduleFoodSchedule.findAll();
    const result = await UserTrainerWorkoutScheduleFoodSchedule.findAll({
      limit: +limit,
      offset: +offset,
      attributes: ['id'],
      include: [
        { model: User, as: 'ToUser', attributes: ['role', 'firstName', 'lastName', 'nickName', 'id'] },
        { model: User, as: 'FromUser', attributes: ['role', 'firstName', 'lastName', 'nickName', 'id'] },
      ],
    });

    const relations = result.map((item) => {
      const { id, ToUser, FromUser } = item;
      return { relationId: id, user: ToUser, trainer: FromUser };
    });

    res.status(200).json({ relations, length: allTransaction.length });
  } catch (err) {
    next(err);
  }
};

exports.updateRelation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { trainerId } = req.body;

    const [rows] = await UserTrainerWorkoutScheduleFoodSchedule.update(
      { trainerId: trainerId },
      {
        where: { id: id },
      }
    );

    if (rows == 0) {
      return res.status(400).json({ message: 'Can not update with this id!!' });
    }

    res.status(200).json({ message: 'Update successful!!' });
  } catch (err) {
    next(err);
  }
};
