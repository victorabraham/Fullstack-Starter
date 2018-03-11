import express from 'express';
import userRoutes from './user.route';
import orgRoutes from './org.route';
import licenseRoutes from './license.route';
import orderRoutes from './order.route';
import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount user routes at /orgs
router.use('/orgs', orgRoutes);

// mount user routes at /licenses
router.use('/licenses', licenseRoutes);

// mount user routes at /orders
router.use('/orders', orderRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
