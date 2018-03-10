import models from '../models';

// Create an org.
const create = (req, res, next) => {
  const orgData = {
    name: req.body.name,
    description: req.body.description,
    email: req.body.email,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
  };
  models.organization.create(orgData).then((newOrg, created) => {
    if (!newOrg) {
      res.send(false);
    }
    if (newOrg) {
      res.json(newOrg);
    }
  });
};

export default { create };
