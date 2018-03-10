import httpStatus from 'http-status';
import userDao from '../dao/user.dao';
import APIError from '../helpers/APIError';

/**
 * Load user and append to req.
 */
function load(req, res, next) {
  userDao.findById(req.params.userId)
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      next();
    });
}

/**
 * Gets user record
 */
function get(req, res, next) {
  userDao.read(req.params.userId)
  .then((user) => {
    if (user) {
      res.json(user);
    } else {
      return next(new APIError('Unable to find user', httpStatus.NOT_FOUND, true));
    }
  });
}

/**
 * Forwards user creation to dao class
 */
function create(req, res, next) {
  userDao.findByUsername(req.body.username)
    .then((user) => {
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
        userDao.create(data)
          .then((newUser, created) => {
            if (!newUser) {
              res.send(false);
            }
            if (newUser) {
              res.json(newUser);
            }
          });
      }
    });
}

/**
 * Update existing user
 */
function update(req, res, next) {
  const data = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  userDao.update(req.params.userId, data)
    .then((saveResult) => {
      if (saveResult && saveResult.length && saveResult.length >= 2) {
        if (saveResult[1] === 1) {
          res.json(saveResult);
        } else if (saveResult[1] === 0) {
          return next(new APIError('Cannot find user', httpStatus.NOT_FOUND, true));
        }
      } else {
        return next(new APIError('Error while updating user', httpStatus.NOT_FOUND, true));
      }
    });
}

/**
 * Get user list.
 */
function findAll(req, res, next) {
  userDao.findAll(req.params.userId)
    .then((users) => {
      res.json(users);
    });
}

/**
 * Delete user
 */
function remove(req, res, next) {
  userDao.remove(req.params.userId)
    .then((rowsDeleted) => {
      if (rowsDeleted === 1) {
        res.status(httpStatus.NO_CONTENT).send();
      } else {
        return next(new APIError('Error while deleting user', httpStatus.NOT_FOUND, true));
      }
    });
}

export default { load, get, create, update, findAll, remove };
