const { Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const FoodSchedule = sequelize.define(
    'FoodSchedule',
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
      breakfast: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brunch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lunch: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      afternoon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      diner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastnight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { tableName: 'food_schedules', underscored: true }
  );

  FoodSchedule.associate = (models) => {
    FoodSchedule.belongsTo(models.UserTrainerWorkoutScheduleFoodSchedule, {
      foreignKey: {
        name: 'userTrainerWorkoutScheduleFoodScheduleId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return FoodSchedule;
};
