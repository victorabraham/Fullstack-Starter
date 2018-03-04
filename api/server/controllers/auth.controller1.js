import jwt from 'jsonwebtoken';
import models from '../models';
import config from '../../config/config';

// Register a user.
const signUp = (req, res, next) => {
  models.user.findOne({
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

const authenticateUser = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(404).json({ message: 'Username and password are needed!' });
  } else {
    const username = req.body.username;
    const password = req.body.password;

    models.user.findOne({
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

export default { signUp, authenticateUser };
