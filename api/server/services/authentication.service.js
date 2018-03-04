import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import config from '../../config/config';

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
  const options = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    ignoreExpiration: false
  };

  passport.use(new JWTStrategy(options, (JWTPayload, callback) => {
    User.findOne({ where: { username: JWTPayload.username } })
      .then((user) => {
        if (!user) {
          callback(null, false);
          return;
        }
        callback(null, user);
      });
  }));
}

export default hookJWTStrategy;
