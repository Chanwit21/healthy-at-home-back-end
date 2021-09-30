const { Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const WorkoutSchedule = sequelize.define(
    'WorkoutSchedule',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      day: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'workout_schedules',
      underscored: true,
    }
  );
  WorkoutSchedule.associate = (models) => {
    WorkoutSchedule.belongsTo(models.UserTrainerWorkoutScheduleFoodSchedule, {
      foreignKey: {
        name: 'userTrainerWorkoutScheduleFoodScheduleId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    WorkoutSchedule.hasMany(models.ExercisePostureWorkoutSchedule, {
      foreignKey: {
        name: 'workoutScheduleId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return WorkoutSchedule;
};
