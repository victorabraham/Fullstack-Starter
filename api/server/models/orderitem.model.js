module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {});

  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
    });
  };
  
  return OrderItem;
};
