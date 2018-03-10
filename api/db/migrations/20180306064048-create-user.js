const config = require('../../config/config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      firstName: {
        notEmpty: true,
        type: Sequelize.STRING,
      },
      lastName: {
        notEmpty: true,
        type: Sequelize.STRING,
      },
      email: {
        notEmpty: true,
        type: Sequelize.STRING,
      },
      username: {
        notEmpty: true,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        notEmpty: true,
        type: Sequelize.STRING,
      },
      orgId: {
        allowNull: true,
        type: Sequelize.UUID,
        onDelete: 'cascade',
        references: {
          model: 'Organizations',
          key: 'id',
          as: 'orgId'
        }
      },
      role: {
        type: Sequelize.INTEGER,
        defaultValue: config.userRoles.user
      },
      lastLogin: {
        type: Sequelize.DATE
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
