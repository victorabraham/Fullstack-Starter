const bCrypt = require('bcrypt-nodejs');

const config = require('../../config/config');

const generateHash = pass => bCrypt.hashSync(pass, bCrypt.genSaltSync(8), null);

const hashPassword = (user) => {
  if (user.changed('password')) {
    // return bCrypt.hash(user.password, 10)
    //         .then((password) => {
    //           user.password = password;
    //         });
    user.password = generateHash(user.password);
  }
  return user;
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: config.userRoles.user
    },
    lastLogin: {
      type: DataTypes.DATE
    },
  }, {
    hooks: {
      beforeValidate: hashPassword
    }
  });

  User.prototype.comparePasswords = function (password, callback) {
    bCrypt.compare(password, this.password, (error, isMatch) => {
      if (error) {
        return callback(error);
      }
      return callback(null, isMatch);
    });
  };

  User.associate = (models) => {
    // associations can be defined here
  };
  return User;
};
