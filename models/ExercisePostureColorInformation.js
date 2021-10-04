// model
const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'ExercisePostureColorInformation',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      bgColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fontColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      executive_posture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reps_sets: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      break_period: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'exercise_posture_color_informations',
      underscored: true,
    }
  );

  return model;
};
