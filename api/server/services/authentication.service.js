import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
// import User from '../models/user';
import { User } from '../models';
import config from '../../config/config';

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
  const options = {
    secretOrKey: config.jwtSecret,
    // jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false
  };

  passport.use(new JWTStrategy(options, (JWTPayload, callback) => {
    console.log(JWTPayload);
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

function checkRouteAccess(accessLevel, callback) {
  function checkUserRole(req, res) {
    if (!(accessLevel & req.user.role)) {
      res.sendStatus(403);
      return;
    }
    callback(req, res);
  }
  return checkUserRole;
}

export default { hookJWTStrategy, checkRouteAccess };
