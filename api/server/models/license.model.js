module.exports = (sequelize, DataTypes) => {
  const License = sequelize.define('License', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    noOfUsers: {
      type: DataTypes.INTEGER
    },
    active: {
      type: DataTypes.BOOLEAN,
      default: false,
      allowNull: false
    }
  }, {});
  License.associate = function (models) {
    License.belongsTo(models.Organization, {
      foreignKey: 'orgId',
      onDelete: 'CASCADE',
    });
  };
  return License;
};
