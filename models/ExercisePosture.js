const { Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const ExercisePosture = sequelize.define(
    'ExercisePosture',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fontColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '#000000',
      },
      backgroundColor: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '#FFFFFF',
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('Full Body', 'Core & Abs', 'Chest', 'Arm', 'Butt', 'Cardio', 'Rest'),
        allowNull: false,
      },
    },
    {
      tableName: 'exercise_posture',
      underscored: true,
    }
  );

  ExercisePosture.associate = (models) => {
    ExercisePosture.hasMany(models.ExercisePostureWorkoutSchedule, {
      foreignKey: {
        name: 'exercisePostureId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return ExercisePosture;
};
