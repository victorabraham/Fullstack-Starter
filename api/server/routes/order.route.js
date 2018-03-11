import express from 'express';
import passport from 'passport';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import orderController from '../controllers/order.controller';
import config from '../../config/config';
import { checkRouteAccess } from '../services/authentication.service';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/orders - Get list of orders */
  .get(passport.authenticate('jwt', { session: false }), checkRouteAccess(config.accessLevels.user, orderController.findAll))

  /** POST /api/orders - Create new order */
  .post([passport.authenticate('jwt', { session: false }), validate(paramValidation.createOrder)], checkRouteAccess(config.accessLevels.user, orderController.create));

router.route('/:orderId')
  /** GET /api/orders/:orderId - Get order */
  .get(passport.authenticate('jwt', { session: false }), checkRouteAccess(config.accessLevels.user, orderController.get))

  /** PUT /api/orders/:orderId - Update order */
  .put([passport.authenticate('jwt', { session: false }), validate(paramValidation.updateOrder)], checkRouteAccess(config.accessLevels.user, orderController.update))

  /** DELETE /api/orders/:orderId - Delete order */
  .delete(passport.authenticate('jwt', { session: false }), checkRouteAccess(config.accessLevels.user, orderController.remove));

export default router;
