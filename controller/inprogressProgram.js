const { UserTrainerWorkoutScheduleFoodSchedule, CourseService } = require('../models');

exports.getCurrentProgram = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const relation = await UserTrainerWorkoutScheduleFoodSchedule.findOne({
      where: { userId: userId },
      attributes: { excute: ['createdAt', 'updatedAt', 'courseServiceId'] },
      include: {
        model: CourseService,
        attributes: { excute: ['createdAt', 'updatedAt', 'imageLink2', 'price'] },
      },
    });
    res.status(200).json({ relation });
  } catch (err) {
    next(err);
  }
};
