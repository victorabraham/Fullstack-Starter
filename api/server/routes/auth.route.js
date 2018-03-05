import express from 'express';
import passport from 'passport';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controller';
import userController from '../controllers/auth.controller1';
import config from '../../config/config';
import { checkRouteAccess } from '../services/authentication.service';

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);


router.route('/authenticate')
  /** POST /api/auth/authenticate - return JWT token */
  .post(validate(paramValidation.login), userController.authenticateUser);

router.route('/guestProtected')
  /** POST /api/auth/authenticate - return JWT token */
  .get(passport.authenticate('jwt', { session: false }), checkRouteAccess(config.accessLevels.user, authCtrl.getRandomNumber));

router.route('/adminProtected')
  /** POST /api/auth/authenticate - return JWT token */
  .get(passport.authenticate('jwt', { session: false }), checkRouteAccess(config.accessLevels.admin, authCtrl.getRandomNumber));

router.route('/superAdminProtected')
  /** POST /api/auth/authenticate - return JWT token */
  .get(passport.authenticate('jwt', { session: false }), checkRouteAccess(config.accessLevels.superAdmin, authCtrl.getRandomNumber));

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber);

export default router;
