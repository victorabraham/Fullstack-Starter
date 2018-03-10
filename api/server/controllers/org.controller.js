import httpStatus from 'http-status';
import orgDao from '../dao/organization.dao';
import APIError from '../helpers/APIError';

/**
 * Gets org record
 */
function get(req, res, next) {
  orgDao.read(req.params.orgId)
    .then((org) => {
      if (org) {
        res.json(org);
      } else {
        return next(new APIError('Unable to find org', httpStatus.NOT_FOUND, true));
      }
    });
}

/**
 * Forwards org creation to dao class
 */
function create(req, res, next) {
  const orgData = {
    name: req.body.name,
    description: req.body.description,
    email: req.body.email,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
  };
  orgDao.create(orgData)
    .then((newOrg, created) => {
      if (!newOrg) {
        res.send(false);
      }
      if (newOrg) {
        res.json(newOrg);
      }
    });
}

/**
 * Update existing org
 */
function update(req, res, next) {
  const data = {
    name: req.body.name,
    description: req.body.description,
    email: req.body.email,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
  };
  orgDao.update(req.params.orgId, data)
    .then((saveResult) => {
      if (saveResult && saveResult.length && saveResult.length >= 2) {
        if (saveResult[1] === 1) {
          res.json(saveResult);
        } else if (saveResult[1] === 0) {
          return next(new APIError('Cannot find org', httpStatus.NOT_FOUND, true));
        }
      } else {
        return next(new APIError('Error while updating org', httpStatus.NOT_FOUND, true));
      }
    });
}

/**
 * Get org list.
 */
function findAll(req, res, next) {
  orgDao.findAll(req.params.orgId)
    .then((orgs) => {
      res.json(orgs);
    });
}

/**
 * Delete org
 */
function remove(req, res, next) {
  orgDao.remove(req.params.orgId)
    .then((rowsDeleted) => {
      if (rowsDeleted === 1) {
        res.status(httpStatus.NO_CONTENT).send();
      } else {
        return next(new APIError('Error while deleting org', httpStatus.NOT_FOUND, true));
      }
    });
}

export default { get, create, update, findAll, remove };
