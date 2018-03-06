module.exports = (sequelize, DataTypes) => {
  const organization = sequelize.define('organization', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      default: false
    },
    street: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    postalCode: {
      type: DataTypes.STRING
    }
  }, {});
  organization.associate = (models) => {
    // associations can be defined here
  };
  return organization;
};
