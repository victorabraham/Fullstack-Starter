import bCrypt from 'bcrypt-nodejs';
import { Strategy as LocalStrategy } from 'passport-local';

module.exports = (passport, userObj) => {
  const User = userObj;
  passport.use('local-signup', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, username, password, done) => {
      const generateHash = pass => bCrypt.hashSync(pass, bCrypt.genSaltSync(8), null);

      User.findOne({
        where: {
          username
        }
      }).then((user) => {
        if (user) {
          return done(null, false, {
            message: 'That email is already taken'
          });
        } else {
          const userPassword = generateHash(password);
          const data = {
            username,
            password: userPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
          };
          User.create(data).then((newUser, created) => {
            if (!newUser) {
              return done(null, false);
            }
            if (newUser) {
              return done(null, newUser);
            }
          });
        }
      });
    }
  ));
};
