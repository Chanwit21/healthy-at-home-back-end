const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      omiseCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      cardId: {
        type: DataTypes.STRING,
      },
      sourceId: {
        type: DataTypes.STRING,
      },
      chargeId: DataTypes.STRING,
      amount: DataTypes.DECIMAL(8, 2),
      status: DataTypes.STRING,
      paidAt: DataTypes.DATE,
      expiresAt: DataTypes.DATE,
    },
    {
      tableName: 'transactions',
      underscored: true,
    }
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.CourseService, {
      foreignKey: {
        name: 'courseServiceId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Transaction.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };

  return Transaction;
};
