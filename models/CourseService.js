const { Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const CourseService = sequelize.define(
    'CourseService',
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
      imageLink1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageLink2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      day: {
        type: DataTypes.DECIMAL(3, 0),
        allowNull: false,
      },
    },
    {
      tableName: 'course_services',
      underscored: true,
    }
  );

  CourseService.associate = (models) => {
    CourseService.hasMany(models.UserTrainerWorkoutScheduleFoodSchedule, {
      foreignKey: {
        name: 'courseServiceId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    CourseService.hasMany(models.Transaction, {
      foreignKey: {
        name: 'courseServiceId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return CourseService;
};
