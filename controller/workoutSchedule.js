const { WorkoutSchedule, ExercisePostureWorkoutSchedule, ExercisePosture } = require('../models');

exports.getWorkoutScheduleByDay = async (req, res, next) => {
  const { day, reletionId } = req.params;
  console.log({ day, reletionId });
  const workOutSchedule = await WorkoutSchedule.findOne({
    order: [[{ model: ExercisePostureWorkoutSchedule }, 'col']],
    where: { userTrainerWorkoutScheduleFoodScheduleId: reletionId, day },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      attributes: { exclude: ['createdAt', 'updatedAt', 'exercisePostureId', 'workoutScheduleId'] },
      model: ExercisePostureWorkoutSchedule,
      include: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        model: ExercisePosture,
      },
    },
  });

  res.status(200).json({ workOutSchedule });
};

exports.createWorkoutScheduleByDay = async (req, res, next) => {
  try {
    const { day, relationId, col1, col2, col3, col4, col5, col6, col7 } = req.body;

    if ([day, relationId, col1].includes(undefined)) {
      return res.status(400).json({ message: 'day and reletionId and col1 is require.' });
    }

    const workOutSchedule = await WorkoutSchedule.create({ day, userTrainerWorkoutScheduleFoodScheduleId: relationId });
    const exercisePostureWorkoutSchedule = await ExercisePostureWorkoutSchedule.bulkCreate([
      {
        col: 'col1',
        workoutScheduleId: workOutSchedule.id,
        exercisePostureId: col1,
      },

      {
        col: 'col2',
        workoutScheduleId: workOutSchedule.id,
        exercisePostureId: col2 || null,
      },
      {
        col: 'col3',
        workoutScheduleId: workOutSchedule.id,
        exercisePostureId: col3 || null,
      },
      {
        col: 'col4',
        workoutScheduleId: workOutSchedule.id,
        exercisePostureId: col4 || null,
      },
      {
        col: 'col5',
        workoutScheduleId: workOutSchedule.id,
        exercisePostureId: col5 || null,
      },
      {
        col: 'col6',
        workoutScheduleId: workOutSchedule.id,
        exercisePostureId: col6 || null,
      },
      {
        col: 'col7',
        workoutScheduleId: workOutSchedule.id,
        exercisePostureId: col7 || null,
      },
    ]);
    res.status(201).json({
      workOutSchedule: {
        id: workOutSchedule.id,
        day: day,
        exercises: exercisePostureWorkoutSchedule,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.editWorkoutScheduleByColAndworkoutScheduleId = async (req, res, next) => {
  try {
    const { col, workoutScheduleId, exercisePostureId } = req.body;

    if (col === 'col1' && !exercisePostureId) {
      return res.status(400).json({ message: 'col1 is require.' });
    }

    const rows = await ExercisePostureWorkoutSchedule.update(
      { exercisePostureId: exercisePostureId || null },
      { where: { workoutScheduleId: workoutScheduleId, col: col } }
    );

    if (rows === 0) {
      return res.status(400).json({ message: 'Can not update with this id.' });
    }

    res.status(200).json({ message: 'Update successful.' });
  } catch (err) {
    next(err);
  }
};

exports.deleteWorkoutScheduleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows1 = await ExercisePostureWorkoutSchedule.destroy({ where: { workoutScheduleId: id } });
    const rows2 = await WorkoutSchedule.destroy({ where: { id: id } });

    if (rows1 === 0 || rows2 === 0) {
      return res.status(400).json({ message: 'Can not delete with this id.' });
    }

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
