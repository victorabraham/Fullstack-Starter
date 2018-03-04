module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
};
