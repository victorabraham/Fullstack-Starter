import userDao from '../dao/user.dao';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  userDao.findById(req, res, next);
}

/**
 * Gets user record
 */
function get(req, res, next) {
  userDao.read(req, res, next);
}

/**
 * Forwards user creation to dao class
 */
function create(req, res, next) {
  userDao.create(req, res, next);
}

/**
 * Update existing user
 */
function update(req, res, next) {
  userDao.update(req, res, next);
}

/**
 * Get user list.
 */
function findAll(req, res, next) {
  userDao.findAll(req, res, next);
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  userDao.remove(req, res, next);
}

export default { load, get, create, update, findAll, remove };
