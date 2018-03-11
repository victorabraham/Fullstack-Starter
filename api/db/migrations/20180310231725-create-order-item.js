module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OrderItems', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      orderId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'cascade',
        references: {
          model: 'Orders',
          key: 'id',
          as: 'orderId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('OrderItems');
  }
};
