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
      paidTime:{
          type:DataTypes.DATE,
          allowNull: false,
      }
      
    },
    {
      tableName: 'transactions',
      underscored: true,
    }
  );

  Transaction.associate = (models)=>{
    Transaction.belongsTo(models.CreditCard,{
        foreignKey: {
          name: 'creditCardId',
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      })
      
    Transaction.belongsTo(models.CourseService, {
      foreignKey: {
        name: 'courseServiceId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    })
  }

  return Transaction
};
