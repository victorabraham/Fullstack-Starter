import httpStatus from 'http-status';
import licenseDao from '../dao/license.dao';
import APIError from '../helpers/APIError';

/**
 * Gets license record
 */
function get(req, res, next) {
  licenseDao.read(req.params.licenseId)
    .then((license) => {
      if (license) {
        res.json(license);
      } else {
        return next(new APIError('Unable to find license', httpStatus.NOT_FOUND, true));
      }
    });
}

/**
 * Forwards license creation to dao class
 */
function create(req, res, next) {
  const data = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    noOfUsers: req.body.noOfUsers,
    active: req.body.active,
    orgId: req.body.orgId
  };
  licenseDao.create(data)
    .then((newlicense, created) => {
      if (!newlicense) {
        res.send(false);
      }
      if (newlicense) {
        res.json(newlicense);
      }
    });
}

/**
 * Update existing license
 */
function update(req, res, next) {
  const data = {
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    noOfUsers: req.body.noOfUsers,
    active: req.body.active,
    orgId: req.body.orgId
  };
  licenseDao.update(req.params.licenseId, data)
    .then((saveResult) => {
      if (saveResult && saveResult.length && saveResult.length >= 2) {
        if (saveResult[1] === 1) {
          res.json(saveResult);
        } else if (saveResult[1] === 0) {
          return next(new APIError('Cannot find license', httpStatus.NOT_FOUND, true));
        }
      } else {
        return next(new APIError('Error while updating license', httpStatus.NOT_FOUND, true));
      }
    });
}

/**
 * Get license list.
 */
function findAll(req, res, next) {
  licenseDao.findAll(req.params.licenseId)
    .then((licenses) => {
      res.json(licenses);
    });
}

/**
 * Delete license
 */
function remove(req, res, next) {
  licenseDao.remove(req.params.licenseId)
    .then((rowsDeleted) => {
      if (rowsDeleted === 1) {
        res.status(httpStatus.NO_CONTENT).send();
      } else {
        return next(new APIError('Error while deleting license', httpStatus.NOT_FOUND, true));
      }
    });
}

export default { get, create, update, findAll, remove };
