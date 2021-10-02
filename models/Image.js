const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      imageLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageType: {
        type: DataTypes.ENUM(
          'food_menu_postworkout',
          'food_menu_normal',
          'food_menu_snack',
          'food_menu_preworkout',
          'result',
          'promotion'
        ),
        allowNull: false,
      },
    },
    {
      tableName: 'images',
      underscored: true,
    }
  );

  return Image
};
