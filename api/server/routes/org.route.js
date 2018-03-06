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
  // .get(orgController.list)

  /** POST /api/orgs - Create new org */
  .post([passport.authenticate('jwt', { session: false }), validate(paramValidation.createOrg)], checkRouteAccess(config.accessLevels.superAdmin, orgController.create));

export default router;
