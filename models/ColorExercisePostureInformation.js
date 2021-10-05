const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ColorExercisePostureInformation = sequelize.define(
    'ColorExercisePostureInformation',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      backgroundColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fontColor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      repSet: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      breakPeriod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'color_exercise_posture_informations',
      underscored: true,
    }
  );

  return ColorExercisePostureInformation;
};
