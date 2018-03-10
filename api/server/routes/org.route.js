import express from 'express';
import passport from 'passport';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import orgController from '../controllers/org.controller';
import config from '../../config/config';
import { checkRouteAccess } from '../services/authentication.service';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/orgs - Get list of orgs */
  .get(passport.authenticate('jwt', { session: false }), checkRouteAccess(config.accessLevels.superAdmin, orgController.findAll))

  /** POST /api/orgs - Create new org */
  .post([passport.authenticate('jwt', { session: false }), validate(paramValidation.createOrg)], checkRouteAccess(config.accessLevels.superAdmin, orgController.create));

router.route('/:orgId')
  /** GET /api/orgs/:orgId - Get org */
  .get(passport.authenticate('jwt', { session: false }), checkRouteAccess(config.accessLevels.superAdmin, orgController.get))

  /** PUT /api/orgs/:orgId - Update org */
  .put([passport.authenticate('jwt', { session: false }), validate(paramValidation.updateOrg)], checkRouteAccess(config.accessLevels.superAdmin, orgController.update))

  /** DELETE /api/orgs/:orgId - Delete org */
  .delete(passport.authenticate('jwt', { session: false }), checkRouteAccess(config.accessLevels.superAdmin, orgController.remove));

export default router;
