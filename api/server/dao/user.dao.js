import httpStatus from 'http-status';
import models from '../models';
import APIError from '../helpers/APIError';

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.firstName - The firstName of user.
 * @property {string} req.body.lastName - The lastName of user.
 * @property {string} req.body.email - The email of user.
 * @returns {User}
 */
const create = (req, res, next) => {
  models.user.findOne({
    where: {
      username: req.body.username
    }
  }).then((user) => {
    if (user) {
      return next(new APIError('Username is already in use', httpStatus.CONFLICT, true));
    } else {
      const data = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      };
      models.user.create(data).then((newUser, created) => {
        if (!newUser) {
          res.send(false);
        }
        if (newUser) {
          res.json(newUser);
        }
      });
    }
  });
};

/**
 * Get user details
 * @property {string} req.params.id - Unique id of the user.
 * @returns {User}
 */
const read = (req, res, next) => {
  models.user.findOne({
    where: {
      id: req.params.userId
    }
  }).then((user) => {
    console.log('############', user);
    if (user) {
      res.json(user);
    } else {
      return next(new APIError('Unable to find user', httpStatus.NOT_FOUND, true));
    }
  });
};


/**
 * update user details
 * @property {string} req.params.id - The username of user.
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.firstName - The firstName of user.
 * @property {string} req.body.lastName - The lastName of user.
 * @property {string} req.body.email - The email of user.
 * @returns {User}
 */
const update = (req, res, next) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  models.user.update(data,
    { where: { id: req.params.userId },
      returning: true,
      plain: true
    }
  ).then((user) => {
    if (user) {
      res.json(user);
    } else {
      return next(new APIError('Error while updating user', httpStatus.NOT_FOUND, true));
    }
  });
};

/**
 * Delete user record
 * @property {string} req.params.id - The username of user.
 * @returns {User}
 */
const remove = (req, res, next) => {
  const deleteObj = { id: req.params.userId };
  models.user.destroy({ where: deleteObj }
  ).then((rowsDeleted) => {
    if (rowsDeleted === 1) {
      res.json(deleteObj);
    } else {
      return next(new APIError('Error while deleting user', httpStatus.NOT_FOUND, true));
    }
  });
};

/**
 * Get list of users
 * @returns {Users}
 */
const findAll = (req, res, next) => {
  models.user.findAll().then((users) => {
    res.json(users);
  });
};

/**
 * Get single user by Id
 * @returns {User}
 */
const findById = (req, res, next) => {
  models.user.findOne({
    where: { id: req.params.userId }
  }).then((user) => {
    req.user = user; // eslint-disable-line no-param-reassign
    next();
  });
};

export default { create, read, update, remove, findAll, findById };
