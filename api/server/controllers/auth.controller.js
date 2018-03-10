import jwt from 'jsonwebtoken';
import { User } from '../models';
import config from '../../config/config';

// Register a user.
const signUp = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then((user) => {
    if (user) {
      res.json({
        message: 'That username is already taken'
      });
    } else {
      const data = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      };
      User.create(data).then((newUser, created) => {
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
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const authenticateUser = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(404).json({ message: 'Username and password are needed!' });
  } else {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
        res.status(404).json({ message: 'Authentication failed!' });
      } else {
        user.comparePasswords(password, (error, isMatch) => {
          if (isMatch && !error) {
            const token = jwt.sign(
              { username: user.username },
              config.jwtSecret,
              { expiresIn: '30m' }
            );
            res.json({ success: true, token });
          } else {
            res.status(404).json({ message: 'Login failed!' });
          }
        });
      }
    }).catch((error) => {
      next(error);
    });
  }
};

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { signUp, authenticateUser, getRandomNumber };
