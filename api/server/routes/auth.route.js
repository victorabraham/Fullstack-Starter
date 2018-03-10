import express from 'express';
import passport from 'passport';
import validate from 'express-validation';
import expressJwt from 'express-jwt';
import paramValidation from '../../config/param-validation';
import authCtrl from '../controllers/auth.controllerOld';
import userController from '../controllers/auth.controller';
import config from '../../config/config';
import { checkRouteAccess } from '../services/authentication.service';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/login')
  /** POST /api/auth/login - Returns token if correct username and password is provided */
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

export default router;
