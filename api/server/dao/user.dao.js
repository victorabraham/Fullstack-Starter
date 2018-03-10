import { User } from '../models';

/**
 * Create new user
 * @property {object} data - Data related to user object.
 * @returns {User}
 */
const create = data => (User.create(data));

/**
 * Get user details
 * @property {string} userId - Unique id of the user.
 * @returns {User}
 */
const read = userId => (
  User.findOne({
    where: {
      id: userId
    }
  })
);


/**
 * update user details
 * @property {string} userId - The id of user.
 * @property {object} data - Data related to user object.
 * @returns {User}
 */
const update = (userId, data) => (
  User.update(data,
    { where: { id: userId },
      returning: true,
      plain: true
    }
  )
);

/**
 * Delete user record
 * @property {string} userId - The username of user.
 * @returns {User}
 */
const remove = userId => (User.destroy({ where: { id: userId } }));

/**
 * Get list of users
 * @returns {Users}
 */
const findAll = () => (User.findAll());

/**
 * Get single user by Id
 * @property {string} userId - The id of user.
 * @returns {User}
 */
const findById = userId => (User.findOne({ where: { id: userId } }));

/**
 * Get single user by username
 * @property {string} username - The username of user.
 * @returns {User}
 */
const findByUsername = username => (User.findOne({ where: { username } }));

export default { create, read, update, remove, findAll, findById, findByUsername };
