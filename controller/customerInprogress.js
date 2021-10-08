const { UserTrainerWorkoutScheduleFoodSchedule, User, CourseService } = require('../models');

exports.getAllCustomer = async (req, res, next) => {
  try {
    const result = await UserTrainerWorkoutScheduleFoodSchedule.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: {
        trainerId: req.user.id,
      },
      include: [
        {
          model: User,
          as: 'ToUser',
          attributes: ['firstName', 'lastName', 'email', 'id', 'nickName', 'weight', 'height', 'phoneNumber'],
        },
        {
          model: CourseService,
          attributes: ['name', 'id', 'day'],
        },
      ],
    });

    const cusTrainerRelations = result.map((item) => {
      const {
        id,
        loseWeightBefore,
        desease,
        dateStart,
        foodAllergic,
        typeOfFood,
        courseServiceId,
        userId,
        trainerId,
        ToUser: { firstName, lastName, email, nickName, weight, height, phoneNumber },
        CourseService: { name, day },
      } = item;
      return {
        relationId: id,
        user: {
          userId,
          firstName,
          lastName,
          email,
          nickName,
          weight,
          height,
          phoneNumber,
          loseWeightBefore,
          desease,
          dateStart,
          foodAllergic,
          typeOfFood,
        },
        course: { courseServiceId, name, day },
        trainerId,
      };
    });
    res.status(200).json({ cusTrainerRelations });
  } catch (err) {
    next(err);
  }
};
