const { Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const ExercisePostureWorkoutSchedule = sequelize.define(
    'ExercisePostureWorkoutSchedule',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      col: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'exercise_posture_workout_schedule',
      underscored: true,
    }
  );

  ExercisePostureWorkoutSchedule.associate = (models) => {
    ExercisePostureWorkoutSchedule.belongsTo(models.WorkoutSchedule, {
      foreignKey: {
        name: 'workoutScheduleId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    ExercisePostureWorkoutSchedule.belongsTo(models.ExercisePosture, {
      foreignKey: {
        name: 'exercisePostureId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return ExercisePostureWorkoutSchedule;
};
