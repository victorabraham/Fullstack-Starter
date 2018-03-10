module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
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
  Organization.associate = (models) => {
    Organization.hasMany(models.User, {
      foreignKey: 'orgId',
      as: 'users',
      onDelete: 'CASCADE',
    });
  };
  Organization.associate = (models) => {
    Organization.hasMany(models.License, {
      foreignKey: 'orgId',
      as: 'licenses',
      onDelete: 'CASCADE',
    });
  };
  return Organization;
};
