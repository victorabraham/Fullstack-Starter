import express from 'express';
import passport from 'passport';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import licenseController from '../controllers/license.controller';
import config from '../../config/config';
import { checkRouteAccess } from '../services/authentication.service';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/licenses - Get list of licenses */
  .get(passport.authenticate('jwt', { session: false }), checkRouteAccess(config.accessLevels.superAdmin, licenseController.findAll))

  /** POST /api/licenses - Create new license */
  .post([passport.authenticate('jwt', { session: false }), validate(paramValidation.createLicense)], checkRouteAccess(config.accessLevels.superAdmin, licenseController.create));

router.route('/:licenseId')
  /** GET /api/licenses/:licenseId - Get license */
  .get(passport.authenticate('jwt', { session: false }), checkRouteAccess(config.accessLevels.superAdmin, licenseController.get))

  /** PUT /api/licenses/:licenseId - Update license */
  .put([passport.authenticate('jwt', { session: false }), validate(paramValidation.updateLicense)], checkRouteAccess(config.accessLevels.superAdmin, licenseController.update))

  /** DELETE /api/licenses/:licenseId - Delete license */
  .delete(passport.authenticate('jwt', { session: false }), checkRouteAccess(config.accessLevels.superAdmin, licenseController.remove));

export default router;
