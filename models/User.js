const { Sequelize } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('ADMIN', 'TRAINER', 'CUSTOMER'),
        allowNull: false,
        defaultValue: 'CUSTOMER',
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickName: {
        type: DataTypes.STRING,
      },
      weight: {
        type: DataTypes.FLOAT(5, 2),
      },
      height: {
        type: DataTypes.FLOAT(5, 2),
      },
      phoneNumber: {
        type: DataTypes.STRING,
        validate: {
          len: [10, 10],
        },
      },
      gender: {
        type: DataTypes.ENUM('MALE', 'FEMALE'),
      },
      image: {
        type: DataTypes.STRING,
      },
      education: {
        type: DataTypes.STRING,
      },
    },
    { tableName: 'users', underscored: true }
  );

  User.associate = (models) => {
    User.hasMany(models.UserTrainerWorkoutScheduleFoodSchedule, {
      as: 'TrainTos',
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    User.hasMany(models.UserTrainerWorkoutScheduleFoodSchedule, {
      as: 'TrainFroms',
      foreignKey: {
        name: 'trainerId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    User.hasMany(models.CreditCard, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return User;
};
