import Joi from 'joi';

export default {
  // mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // PUT /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
    },
    params: {
      userId: Joi.string().required()
    }
  },

  // POST /api/org
  createOrg: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      description: Joi.string().required()
    }
  },

  // PUT /api/org
  updateOrg: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      description: Joi.string().required()
    },
    params: {
      orgId: Joi.string().required()
    }
  },

  // POST /api/licenses
  createLicense: {
    body: {
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      orgId: Joi.string().required(),
      noOfUsers: Joi.number().integer().max(1000).required()
    }
  },

  // PUT /api/licenses
  updateLicense: {
    body: {
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
      noOfUsers: Joi.number().integer().max(1000).required()
    },
    params: {
      licenseId: Joi.string().required()
    }
  },
  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
