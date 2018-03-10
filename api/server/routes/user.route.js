import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userController from '../controllers/user.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(userController.findAll)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userController.create);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(userController.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), userController.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userController.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userController.load);

export default router;
