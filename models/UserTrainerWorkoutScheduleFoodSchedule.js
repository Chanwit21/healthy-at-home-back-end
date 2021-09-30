const { Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const UserTrainerWorkoutScheduleFoodSchedule = sequelize.define(
    'UserTrainerWorkoutScheduleFoodSchedule',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      loseWeightBefore: {
        type: DataTypes.ENUM('intermediate-fasting', 'keto-diet', 'mediterranean-diet', 'atkins-diet', 'Paleo'),
      },
      desease: { type: DataTypes.STRING },
      dateStart: { type: DataTypes.DATEONLY, allowNull: false },
      foodAllergic: { type: DataTypes.STRING },
      typeOfFood: {
        type: DataTypes.ENUM('vegan', 'halal', 'plant-base', 'meat-and-poultry', 'fish-and-seafood', 'all-types'),
        allowNull: false,
      },
    },
    { tableName: 'user_trainer_workout_schedule_food_schedule', underscored: true }
  );

  //as ใช้กรณี self Join
  UserTrainerWorkoutScheduleFoodSchedule.associate = (models) => {
    UserTrainerWorkoutScheduleFoodSchedule.belongsTo(models.User, {
      as: 'ToUser',
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    UserTrainerWorkoutScheduleFoodSchedule.belongsTo(models.User, {
      as: 'FromUser',
      foreignKey: {
        name: 'trainerId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    UserTrainerWorkoutScheduleFoodSchedule.belongsTo(models.CourseService, {
      foreignKey: {
        name: 'courseServiceId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    UserTrainerWorkoutScheduleFoodSchedule.hasMany(models.WorkoutSchedule, {
      foreignKey: {
        name: 'userTrainerWorkoutScheduleFoodScheduleId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    UserTrainerWorkoutScheduleFoodSchedule.hasMany(models.FoodSchedule, {
      foreignKey: {
        name: 'userTrainerWorkoutScheduleFoodScheduleId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return UserTrainerWorkoutScheduleFoodSchedule;
};
