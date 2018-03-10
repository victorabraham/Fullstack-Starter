module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Licenses', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      orgId: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: 'cascade',
        unique: true,
        references: {
          model: 'Organizations',
          key: 'id',
          as: 'orgId'
        }
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      noOfUsers: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN,
        default: false,
        allowNull: false
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
    return queryInterface.dropTable('Licenses');
  }
};
